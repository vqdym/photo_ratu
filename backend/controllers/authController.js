const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const Admin = require("../models/adminModel");
const AppError = require("../utils/appError");

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function createSendToken(admin, statusCode, res) {
  const token = signToken(admin._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", "token", cookieOptions);

  admin.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      admin,
    },
  });
}

exports.signupAdmin = catchAsync(async (req, res, next) => {
  const adminUser = await Admin.create(req.body);
  createSendToken(adminUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please provide email and password", 400));
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(admin, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }
  //   console.log(token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentAdmin = await Admin.findById(decoded.id);
  if (!currentAdmin) {
    return next(
      new AppError(
        "The user belongign to this token does no longer exist",
        401,
      ),
    );
  }

  req.admin = currentAdmin;
  next();
});
