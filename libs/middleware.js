const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      const errResponse = "TOKEN_EXPIRED_ERROR";
      console.log(errResponse);
      return res.status(419).json(errResponse);
    }
    console.log(error);
    const errResponse = "UNAUTHORIZED_ERROR";
    console.log(errResponse);
    return res.status(401).json(errResponse);
  }
};
