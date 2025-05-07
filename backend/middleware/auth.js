const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header)
    return res.status(401).json({ msg: "No token, authorization denied" });

  const parts = header.split(" ");
  if (parts[0] !== "Bearer" || !parts[1])
    return res.status(401).json({ msg: "Token format invalid" });

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
