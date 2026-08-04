const Preset = require('../models/presetModel');
const catchAsync = require('../utils/catchAsync');
const apiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'imageAfter' || file.fieldname === 'imageBefore') {
      cb(null, 'public/img/presets');
    } else if (file.fieldname === 'presetFile') {
      cb(null, 'public/presets');
    }
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    let prefix = 'preset-file';
    if (file.fieldname === 'imageAfter') prefix = 'preset-img-after';
    if (file.fieldname === 'imageBefore') prefix = 'preset-img-before';
    cb(null, `${prefix}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    (file.fieldname === 'imageAfter' || file.fieldname === 'imageBefore') &&
    !file.mimetype.startsWith('image')
  ) {
    return cb(new AppError('Please upload only images for cover!', 400), false);
  }

  if (file.fieldname === 'presetFile') {
    const allowedExt = ['zip', 'rar', 'dng', 'xmp', '7z'];
    const ext = file.originalname.split('.').pop().toLowerCase();

    if (!allowedExt.includes(ext)) {
      return cb(
        new AppError(
          'Invalid preset file format! Upload .zip, .rar, .dng, or .xmp',
          400,
        ),
        false,
      );
    }
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPresetFiles = upload.fields([
  { name: 'imageBefore', maxCount: 1 },
  { name: 'imageAfter', maxCount: 1 },
  { name: 'presetFile', maxCount: 1 },
]);

exports.setPresetFilesToBody = (req, res, next) => {
  if (req.files) {
    if (req.files.imageAfter)
      req.body.imageAfter = req.files.imageAfter[0].filename;
    if (req.files.imageBefore)
      req.body.imageBefore = req.files.imageBefore[0].filename;
    if (req.files.presetFile)
      req.body.presetFile = req.files.presetFile[0].filename;
  }
  next();
};

exports.getAllPresets = factory.getAll(Preset);
exports.createPreset = factory.createOne(Preset);
exports.deletePreset = factory.deleteOne(Preset);
exports.getPresetById = factory.getOne(Preset);
exports.updatePreset = factory.updateOne(Preset);
