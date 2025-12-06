const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
