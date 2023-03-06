const catchAsync = require("../error-handling/catchAsync");
const jwt = require("jsonwebtoken");
const util = require("util");
const AppError = require("../error-handling/AppError");
const User = require("../../models/User");
module.exports = catchAsync(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log({ token });

  if (!token) {
    return next(new AppError("You are not logged in to gain access"));
  }

  // console.log(token)
  const decoded = await util.promisify(jwt.verify)(token, process.env.JWTKEY);
  const user = await User.findById(decoded.id);
  req.user = user;
  console.log(user);
  next();
});
