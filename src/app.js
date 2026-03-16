const express = require("express");
const helmet = require("helmet");

const { registerRouter } = require("./routes/user/register.routes");
const { verifyRouter } = require("./routes/user/verify.routes");

const app = express();

app.use(helmet());
app.use(express.json());

app.use(registerRouter);
app.use(verifyRouter);

module.exports = app;
