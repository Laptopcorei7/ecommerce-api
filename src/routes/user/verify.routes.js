const express = require("express");
const { httpVerifyEmail } = require("../../controllers/verify.controller");

const verifyRouter = express.Router();

verifyRouter.get("/verify", httpVerifyEmail);

module.exports = {
  verifyRouter: verifyRouter,
};
