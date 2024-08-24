const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if(!req.headers["authorization"]) {
    return next();
  }
  const authorizationHeader = req.headers["authorization"];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Truy cập bị từ chối",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.userID = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

module.exports = verifyToken;