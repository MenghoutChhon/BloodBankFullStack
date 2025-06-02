const jwt = require("jsonwebtoken");

/**
 * Role-based Auth Middleware.
 * Usage: authMiddleware(['donor', 'admin']) or authMiddleware() for any logged-in user
 */
function authMiddleware(roles) {
  return function (req, res, next) {
    const auth = req.header("Authorization");
    if (!auth) return res.status(401).json({ error: "No token" });
    try {
      const token = auth.replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_SECRET);
      // If roles specified, check user role
      if (roles && roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
}

module.exports = authMiddleware;
