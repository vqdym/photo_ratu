import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import Preset from '../models/presetModel';
import AppError from '../utils/appError';
import cloudinary from '../utils/cloudinary';
import { uploadToS3, s3 } from '../utils/s3';
import catchAsync from '../utils/catchAsync';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
  deleteCloudinaryPhoto,
} from './handlerFactory';
import processAndUploadImage from '../utils/processAndUploadImage';

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

async function deleteImage(image: string) {
  const splitted = image.split('/');
  const index = splitted.indexOf('photo_ratu');
  if (index !== -1) {
    const publicId = splitted
      .slice(index)
      .join('/')
      .replace(/\.[^.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
  }
}

export const deletePreset = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const preset = await Preset.findById(req.params.id);
    if (!preset) {
      return next(new AppError('Preset not found', 404));
    }

    if (preset.imageBefore) {
      await deleteImage(preset.imageBefore);
    }

    if (preset.imageAfter) {
      await deleteImage(preset.imageAfter);
    }

    if (preset.presetFile) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: preset.presetFile,
        }),
      );
    }
    await Preset.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);

export const updatePresetImagesAndFile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next();

    const preset = await Preset.findById(req.params.id);
    if (!preset) return next(new AppError('Preset not found.', 400));

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.imageBefore) {
      if (preset.imageBefore) await deleteImage(preset.imageBefore);
      req.body.imageBefore = await processAndUploadImage(
        files.imageBefore[0].buffer,
        'photo_ratu/presets/images',
        'preset',
      );
    }
    if (files.imageAfter) {
      if (preset.imageAfter) await deleteImage(preset.imageAfter);

      req.body.imageAfter = await processAndUploadImage(
        files.imageAfter[0].buffer,
        'photo_ratu/presets',
        'preset',
      );
    }
    if (files.presetFile) {
      if (preset.presetFile) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: preset.presetFile,
          }),
        );
      }

      const newFileName = `preset-${Date.now()}-${files.presetFile[0].originalname.replace(/\s+/g, '_')}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: newFileName,
          Body: files.presetFile[0].buffer,
          ContentType: files.presetFile[0].mimetype,
        }),
      );
      req.body.presetFile = newFileName;
    }
    next();
  },
);

export const getAllPresets = getAll(Preset);
export const createPreset = createOne(Preset);
export const getPresetById = getOne(Preset);
export const updatePreset = updateOne(Preset);
