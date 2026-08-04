const Gallery = require("../models/galleryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.getAllPhotos = factory.getAll(Gallery);
exports.createPhoto = factory.createOne(Gallery);
exports.deletePhoto = factory.deleteOne(Gallery);
exports.getPhotoById = factory.getOne(Gallery);
exports.updatePhoto = factory.updateOne(Gallery);
