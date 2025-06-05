const jwt = require("jsonwebtoken");

const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }
    try {
      req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid access token" });
    }
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
module.exports = authorize;
