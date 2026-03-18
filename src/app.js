const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { registerRouter } = require("./routes/user/register.routes");
const { verifyRouter } = require("./routes/user/verify.routes");
const { loginRouter } = require("./routes/user/login.routes");

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
  express.json({
    limit: "100kb",
  }),
);

app.use(registerRouter);
app.use(verifyRouter);
app.use(loginRouter);

module.exports = app;
