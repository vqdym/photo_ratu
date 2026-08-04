import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import Preset from '../models/presetModel';
import AppError from '../utils/appError';
import cloudinary from '../utils/cloudinary';
import { uploadToS3 } from '../utils/s3';
import catchAsync from '../utils/catchAsync';
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from './handlerFactory';

const multerStorage = multer.memoryStorage();
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

const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: 'image' | 'auto' = 'image',
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      },
    );
    stream.end(buffer);
  });
};

export const setPresetFilesToBody = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next();

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (files.imageBefore) {
      req.body.imageBefore = await uploadToCloudinary(
        files.imageBefore[0].buffer,
        'photo_ratu/presets/images',
      );
    }
    if (files.imageAfter) {
      req.body.imageAfter = await uploadToCloudinary(
        files.imageAfter[0].buffer,
        'photo_ratu/presets/images',
      );
    }

    if (files.presetFile) {
      const ext = files.presetFile[0].originalname.split('.').pop();
      const fileName = `preset-${Date.now()}.${ext}`;

      await uploadToS3(
        files.presetFile[0].buffer,
        fileName,
        files.presetFile[0].mimetype,
      );

      req.body.presetFile = fileName;
    }
    next();
  },
);

export const getAllPresets = getAll(Preset);
export const createPreset = createOne(Preset);
export const deletePreset = deleteOne(Preset);
export const getPresetById = getOne(Preset);
export const updatePreset = updateOne(Preset);
