const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const registerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpires: {
    type: Date,
  },
});

registerSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  try {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  } catch (err) {
    throw err;
  }
});

module.exports = mongoose.model("Register", registerSchema);
