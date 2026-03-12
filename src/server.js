require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { error } = require("console");

mongoose.connect(process.env.MONGO_URI).catch((error) => handleError(error));

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
