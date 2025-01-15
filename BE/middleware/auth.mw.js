const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ message: "ERROR_AUTH_TOKEN_REQUIRED" });
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const { _id } = decoded;
      const payload = { _id };
      req.obj = payload;
    } else {
      return res
        .status(401)
        .json({ statusCode: 401, message: "ERROR_AUTH_TOKEN_REQUIRED" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ statusCode: 401, message: error.message });
  }
};

module.exports = {
  verifyAuth,
};
