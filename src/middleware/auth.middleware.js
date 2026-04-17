const register = require("../models/user/register.mongo");
const { getSession } = require("../controllers/login.controller");

async function requireAuth(req, res, next) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  const session = getSession(sessionId);

  if (!getSession) {
    return res.status(401).json({
      error: "Session invalid or expired",
    });
  }

  try {
    const userId = session.userId;
    const user = await register.findById(userId);

    if (!user) {
      delete getSession[sessionId];
      return res.status(401).json({
        error: "User not found",
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerfied: user.isVerfied,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({
      error: "Authentication failed",
    });
  }
}

module.exports = {
  requireAuth: requireAuth,
};
