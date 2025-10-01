const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authMiddlewares = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  const token = authHeader
  // console.log(authHeader);
  // console.log(token);

  try {
    const { username, userid } = jwt.verify(token, "secret");

    req.user = { username, userid };

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "invalid authentication" });
  }
};

module.exports = authMiddlewares;
