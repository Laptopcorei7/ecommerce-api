const express = require("express");
const rateLimit = require("express-rate-limit");
const { httpLogin, httpLogout } = require("../../controllers/login.controller");

const loginRouter = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

loginRouter.post("/login", loginLimiter, httpLogin);
loginRouter.post("/logout", httpLogout);

module.exports = {
  loginRouter: loginRouter,
};
