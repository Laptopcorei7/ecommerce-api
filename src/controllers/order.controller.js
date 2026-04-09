const mongoose = require("mongoose");

const Order = require("../models/product/order.mongo");
const Cart = require("../models/product/cart.mongo");
// const Product = require("../models/product/product.mongo");

function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `ORD-${year}${month}${day}-${random}`;
}

async function httpCreateOrder(req, res) {
  const userId = req.user.id;
  const { shippingAddress } = req.body;

  if (
    !shippingAddress ||
    !shippingAddress.street ||
    !shippingAddress.city ||
    !shippingAddress.country
  ) {
    return res.status(400).json({
      error: "Complete shipping address is required (street, city, country)",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cartItems = await Cart.find({ userId: userId })
      .populate("productId")
      .session(session);

    if (cartItems.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        error: "Cart is empty",
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const cartItem of cartItems) {
      const product = cartItem.productId;

      if (!product) {
        await session.abortTransaction();
        return res.status(400).json({
          error: "One or more products in cart are no longer available",
        });
      }

      if (cartItem.quantity > product.stock) {
        await session.abortTransaction();
        return res.status(400).json({
          error: "Insufficient stock for ${product.name}",
          requested: cartItem.quantity,
          available: product.stock,
        });
      }

      const itemSubtotal = cartItem.quantity * cartItem.price;
      subtotal += itemSubtotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: cartItem.price,
        quantity: cartItem.quantity,
        subtotal: itemSubtotal,
      });
    }

    const tax = subtotal * 0.1;
    const shipping = 10.0;
    const total = subtotal + tax + shipping;

    const orderNumber = generateOrderNumber;

    const order = await Order.create(
      [
        {
          userId: userId,
          orderNumber: orderNumber,
          items: orderItems,
          subtotal: subtotal,
          tax: tax,
          shipping: shipping,
          total: total,
          status: "pending",
          shippingAddress: shippingAddress,
          orderDate: new Date(),
        },
      ],
      { session },
    );

    for (const cartItem of cartItems) {
      const product = cartItem.productId;
      product.stock = cartItem.productId;
      product.stock -= cartItem.quantity;
      await product.save({ session });
    }

    await Cart.deleteMany({ userId: userId }, { session });

    await session.commitTransaction();

    return res.status(201).json({
      message: "Order created successfully",
      order: {
        id: order[0]._id,
        orderNumber: order[0].orderNumber,
        total: order[0].total,
        status: order[0].status,
        itemCount: order[0].items.length,
        createdAt: order[0].createdAt,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Create order error:", err);
    return res.status(500).json({
      error: "Failed to create order",
    });
  } finally {
    session.endSession();
  }
}

async function httpGetUserOrders(req, res) {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId: userId })
      .sort({ createdAt: -1 })
      .select("__v");

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      orderNumber: order.orderNumber,
      total: order.total,
      status: order.status,
      itemCount: order.items.length,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      shippingAddress: order.shippingAddress,
    }));

    return res.status(200).json({
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (err) {
    console.error("Get orders error:", err);
    return res.status(500).json({
      error: "Failed to get orders",
    });
  }
}

async function httpGetOrder(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Order not found",
    });
  }

  try {
    const order = await Order.findById(id)
      .populate("items.productId", "name category images")
      .select("__v");

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    if (isAdmin && order.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "Not your order",
      });
    }

    return res.status(200).json({
      order: order,
    });
  } catch (err) {
    console.error("Get order error:", err);

    if (err.kind === "ObjectId") {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(500).json({
      error: "Failed to get order",
    });
  }
}

async function httpGetAllOrders(req, res) {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .select("__v");

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      orderNumber: order.orderNumber,
      customer: {
        name: order.userId.name,
        email: order.userId.email,
      },
      total: order.total,
      status: order.status,
      itemCount: order.items.length,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
    }));

    return res.status(200).json({
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (err) {
    console.error("Get all orders error:", err);
    return res.status(500).json({
      error: "Failed to get orders",
    });
  }
}

async function httpUpdateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      error: "Invalid status",
      validStatuses: validStatuses,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Order not found",
    });
  }

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    order.status = status;

    if (status === "delivered" && !order.deliveryDate) {
      order.deliveryDate = new Date();
    }

    await order.save();

    return res.status(200).json({
      message: "Order status updated",
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        deliveryDate: order.deliveryDate,
        updatedAt: order.updatedAt,
      },
    });
  } catch (err) {
    console.error("Update order status error:", err);

    if (err.kind === "ObjectId") {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(500).json({
      error: "Failed to update order status",
    });
  }
}

module.exports = {
  httpCreateOrder: httpCreateOrder,
  httpGetUserOrders: httpGetUserOrders,
  httpGetOrder: httpGetOrder,
  httpGetAllOrders: httpGetAllOrders,
  httpUpdateOrderStatus: httpUpdateOrderStatus,
};
