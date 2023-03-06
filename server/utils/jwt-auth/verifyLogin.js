const catchAsync = require("../error-handling/catchAsync");
const util = require("util");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;
  // console.log({ token });

  if (!token) {
    console.log("calling next " + token);
    return next();
  }
  token = token.split(" ")[1];
  // console.log(token)
  try {
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWTKEY);

    req.user = decoded;
    const newUser = await User.findById(decoded.id);
    return res.status(200).json({
      status: "Success",
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(300).json({
      status: "Failed",
      data: { error: { e } },
    });
  }
});
