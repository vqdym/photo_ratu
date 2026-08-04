import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import Preset from '../models/presetModel';
import AppError from '../utils/appError';
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from './handlerFactory';

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

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (
    (file.fieldname === 'imageAfter' || file.fieldname === 'imageBefore') &&
    !file.mimetype.startsWith('image')
  ) {
    return cb(new AppError('Please upload only images for cover!', 400));
  }

  if (file.fieldname === 'presetFile') {
    const allowedExt = ['zip', 'rar', 'dng', 'xmp', '7z'];
    const ext = file.originalname.split('.').pop()?.toLowerCase();

    if (!ext || !allowedExt.includes(ext)) {
      return cb(
        new AppError(
          'Invalid preset file format! Upload .zip, .rar, .dng, or .xmp',
          400,
        ),
      );
    }
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadPresetFiles = upload.fields([
  { name: 'imageBefore', maxCount: 1 },
  { name: 'imageAfter', maxCount: 1 },
  { name: 'presetFile', maxCount: 1 },
]);

export const setPresetFilesToBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  if (files) {
    if (files.imageAfter) req.body.imageAfter = files.imageAfter[0].filename;
    if (files.imageBefore) req.body.imageBefore = files.imageBefore[0].filename;
    if (files.presetFile) req.body.presetFile = files.presetFile[0].filename;
  }
  next();
};

export const getAllPresets = getAll(Preset);
export const createPreset = createOne(Preset);
export const deletePreset = deleteOne(Preset);
export const getPresetById = getOne(Preset);
export const updatePreset = updateOne(Preset);
