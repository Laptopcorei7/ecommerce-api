const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const register = require("../models/user/register.mongo");

const sessions = {};

function generateSessionId() {
  return crypto.randomBytes(32).toString("hex");
}

async function httpLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({
      error: "Invalid data types",
    });
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({
      error: "Invalid email format",
    });
  }

  try {
    const user = await register.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(403).json({
        error: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: "Please verify your email before logging in",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const sessionId = generateSessionId();
    sessions[sessionId] = {
      userId: user._id,
      email: user.email,
      createdAt: Date.now(),
    };

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      error: "Login failed. Please try again.",
    });
  }
}

module.exports = {
  httpLogin: httpLogin,
  sessions: sessions,
};
