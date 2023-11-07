const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const keys = process.env.JWTSECRETKEY;

const verifyToken = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    req.decoded = jwt.verify(req.headers.authorization.split(" ")[1], keys);

    return next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res
        .status(419)
        .json({ code: 419, message: "토큰이 만료되었습니다." });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

module.exports = { verifyToken };
