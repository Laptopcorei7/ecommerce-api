const express = require("express");
const rateLimit = require("express-rate-limit");
const { httpLogin } = require("../../controllers/login.controller");

const loginRouter = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

loginRouter.post("/login", loginLimiter, httpLogin);

module.exports = {
  loginRouter: loginRouter,
};
