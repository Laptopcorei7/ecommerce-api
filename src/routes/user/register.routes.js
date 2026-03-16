const express = require("express");
const rateLimit = require("express-rate-limit");

const { httpAddNewUser } = require("../../controllers/register.controller");

const registerRouter = express.Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many registration attempts. Try again later.",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

registerRouter.post("/register", registerLimiter, httpAddNewUser);

module.exports = {
  registerRouter: registerRouter,
};
