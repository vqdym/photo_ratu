const Preset = require("../models/presetModel");
const catchAsync = require("../utils/catchAsync");
const apiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.getAllPresets = factory.getAll(Preset);
exports.createPreset = factory.createOne(Preset);
exports.deletePreset = factory.deleteOne(Preset);
exports.getPresetById = factory.getOne(Preset);
exports.updatePreset = factory.updateOne(Preset);
