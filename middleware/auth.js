const jwt = require("jsonwebtoken");
const config = require("config");

// Exporting Middleware
module.exports = function (req, res, next) {
  // Extract token from header
  const token = req.header("x-auth-token");

  //Check if token exists
  if (!token) return res.status(401).json("Authorization Denied");

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwt"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};
