const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const apiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.setPresetId = (req, res, next) => {
  if (!req.body.preset) req.body.preset = req.params.presetId;
  next();
};

exports.getAllOrders = factory.getAll(Order);
exports.createOrder = factory.createOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.getOrderById = factory.getOne(Order, { path: "preset" });
exports.updateOrder = factory.updateOne(Order);
