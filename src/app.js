const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/user/auth.routes");
const { protectedRouter } = require("./routes/user/protected.router");
const { productRouter } = require("./routes/products/product.routes");
const { cartRouter } = require("./routes/products/cart.routes");
const { orderRouter } = require("./routes/products/order.routes");
const { profileRouter } = require("./routes/user/profile.routes");

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
  express.json({
    limit: "100kb",
  }),
);

app.use(authRouter);
app.use(protectedRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(profileRouter);

module.exports = app;
