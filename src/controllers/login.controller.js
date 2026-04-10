const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const register = require("../models/user/register.mongo");

const SESSION_FILE = path.join(__dirname, "../../data/sessions.json");
let sessions = {};

try {
  if (fs.existsSync(SESSION_FILE)) {
    const data = fs.readFileSync(SESSION_FILE, "utf-8");
    sessions = JSON.parse(data);
    console.log("✓ Loaded", Object.keys(sessions).length, "sessions from file");
  }
} catch (err) {
  console.error("Error loading sessions:", err);
  sessions = {};
}

function saveSessions() {
  try {
    const dir = path.dirname(SESSION_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SESSION_FILE, JSON.stringify(sessions, null, 2));
  } catch (err) {
    console.error("Error saving sessions:", err);
  }
}

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

    saveSessions();

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

async function httpLogout(req, res) {
  const sessionId = req.cookies.sessionId;

  delete sessions[sessionId];

  saveSessions();

  res.clearCookie("sessionId");

  return res.status(200).json({
    error: "Logout successful",
  });
}

async function httpGetMe(req, res) {
  return res.status(200).json({
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
}

module.exports = {
  httpLogin: httpLogin,
  sessions: sessions,
  httpLogout: httpLogout,
  httpGetMe: httpGetMe,
};
