const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  httpLogin,
  httpLogout,
  httpGetMe,
} = require("../../controllers/login.controller");
const { requireAuth } = require("../../middleware/auth.middleware");

const loginRouter = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

loginRouter.post("/login", loginLimiter, httpLogin);
loginRouter.post("/logout", requireAuth, httpLogout);
loginRouter.get("/me", requireAuth, httpGetMe);

module.exports = {
  loginRouter: loginRouter,
};
