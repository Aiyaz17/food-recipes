const User = require("../models/User");
const AppError = require("../utils/error-handling/AppError");
const catchAsync = require("../utils/error-handling/catchAsync");
const signToken = require("../utils/jwt-auth/signToken");
const verifyPassword = require("../utils/verifyPassword");

const create = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const newUser = await User.create({ email, password, name });
  const token = await signToken(newUser._id, newUser.email);

  res.status(200).json({
    status: "Success",
    data: {
      user: {
        _id: newUser._id,
        name,
        email,
      },
    },
    token,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Cannot leave email id or password field blank"));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      status: "Failed",
      message: "User not registered",
      data: {},
    });
  }
  const verify = await verifyPassword(password, user.password);
  if (!verify) {
    // return next(new AppError("Enter the correct password"));
    return res.status(401).json({
      status: "Failed",
      message: "Incorrect Password",
      data: {},
    });
  }
  const token = await signToken(user._id, user.role);

  res.status(200).json({
    status: "Success",
    message: "Login Successful",
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    token,
  });
});

module.exports = { create, login };
