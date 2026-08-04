const Gallery = require('../models/galleryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, res, cb) => {
  if (res.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadGalleryPhoto = upload.single('photo');
exports.resizeGalleryPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `gallery-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1200, 800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/gallery/${req.file.filename}`);

  req.body.imageUrl = req.file.filename;

  next();
});

exports.getAllPhotos = factory.getAll(Gallery);
exports.createPhoto = factory.createOne(Gallery);
exports.deletePhoto = factory.deleteOne(Gallery);
exports.getPhotoById = factory.getOne(Gallery);
exports.updatePhoto = factory.updateOne(Gallery);
