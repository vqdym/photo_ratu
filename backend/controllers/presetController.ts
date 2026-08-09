import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import Preset from '../models/presetModel';
import AppError from '../utils/appError';
import { uploadToS3, s3 } from '../utils/s3';
import catchAsync from '../utils/catchAsync';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  getAll,
  getOne,
  updateOne,
  createOne,
  processAndUploadImage,
  deleteFromCloudinary,
} from './handlerFactory';

const multerStorage = multer.memoryStorage();
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (
    (file.fieldname === 'beforeImages' || file.fieldname === 'afterImages') &&
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
          'Invalid preset file format! Upload .zip, .rar, .dng, .7z or .xmp',
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

export const uploadPresetData = upload.fields([
  { name: 'presetFile', maxCount: 1 },
  { name: 'beforeImages', maxCount: 20 },
  { name: 'afterImages', maxCount: 20 },
]);

export const setPresetFilesToBody = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next();

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (files.presetFile) {
      const ext = files.presetFile[0].originalname.split('.').pop();
      const fileName = `preset-${Date.now()}.${ext}`;

      await uploadToS3(
        files.presetFile[0].buffer,
        fileName,
        files.presetFile[0].mimetype,
      );

      req.body.presetFileUrl = fileName;
    }

    if (files.beforeImages && files.afterImages) {
      if (files.beforeImages.length !== files.afterImages.length) {
        return next(
          new AppError(
            'The number of "before" and "after" photos must be the same!',
            400,
          ),
        );
      }

      req.body.examples = [];

      await Promise.all(
        files.beforeImages.map(async (beforeFile, index) => {
          const afterFile = files.afterImages[index];

          const [beforeUrl, afterUrl] = await Promise.all([
            processAndUploadImage(
              beforeFile.buffer,
              'photo_ratu/presets/images',
              `before-${Date.now()}-${index}`,
            ),
            processAndUploadImage(
              afterFile.buffer,
              'photo_ratu/presets/images',
              `after-${Date.now()}-${index}`,
            ),
          ]);

          req.body.examples.push({
            beforeImage: beforeUrl,
            afterImage: afterUrl,
          });
        }),
      );
    }
    next();
  },
);

export const deletePreset = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const preset = await Preset.findById(req.params.id);
    if (!preset) {
      return next(new AppError('Preset not found', 404));
    }

    if (preset.examples && preset.examples.length > 0) {
      await Promise.all(
        preset.examples.map(async (example) => {
          await deleteFromCloudinary(example.beforeImage);
          await deleteFromCloudinary(example.afterImage);
        }),
      );
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
    const preset = await Preset.findById(req.params.id);
    if (!preset) return next(new AppError('Preset not found.', 404));

    if (!req.files && !req.body.deletedExamples && !req.body.presetFile) {
      return next();
    }

    // Беремо поточні фотографії з бази
    let currentExamples = preset.examples || [];

    // ==========================================
    // 1. ВИДАЛЕННЯ СТАРИХ ПАР (Якщо фронтенд просить)
    // ==========================================
    if (req.body.deletedExamples) {
      // У form-data масиви об'єктів зазвичай передаються як JSON-рядок, тому парсимо його
      const examplesToDelete =
        typeof req.body.deletedExamples === 'string'
          ? JSON.parse(req.body.deletedExamples)
          : req.body.deletedExamples;

      // Видаляємо фотки з Cloudinary
      await Promise.all(
        examplesToDelete.map(
          async (example: { beforeImage: string; afterImage: string }) => {
            if (example.beforeImage)
              await deleteFromCloudinary(example.beforeImage);
            if (example.afterImage)
              await deleteFromCloudinary(example.afterImage);
          },
        ),
      );

      // Видаляємо ці пари з нашого масиву (щоб вони зникли з БД)
      currentExamples = currentExamples.filter(
        (ex) =>
          !examplesToDelete.some(
            (del: any) => del.beforeImage === ex.beforeImage,
          ),
      );
    }

    // ==========================================
    // 2. ДОДАВАННЯ НОВИХ ПАР
    // ==========================================
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let newExamples: { beforeImage: string; afterImage: string }[] = [];

    if (files && files.beforeImages && files.afterImages) {
      if (files.beforeImages.length !== files.afterImages.length) {
        return next(
          new AppError(
            'The number of "before" and "after" photos must be the same!',
            400,
          ),
        );
      }

      await Promise.all(
        files.beforeImages.map(async (beforeFile, index) => {
          const afterFile = files.afterImages[index];

          const [beforeUrl, afterUrl] = await Promise.all([
            processAndUploadImage(
              beforeFile.buffer,
              'photo_ratu/presets/images',
              `before-${Date.now()}-${index}`,
            ),
            processAndUploadImage(
              afterFile.buffer,
              'photo_ratu/presets/images',
              `after-${Date.now()}-${index}`,
            ),
          ]);

          newExamples.push({
            beforeImage: beforeUrl,
            afterImage: afterUrl,
          });
        }),
      );
    }

    // Об'єднуємо те, що залишилося після видалення, з тим, що щойно додали
    req.body.examples = [...currentExamples, ...newExamples];

    // ==========================================
    // 3. ОНОВЛЕННЯ ZIP-АРХІВУ (S3)
    // ==========================================
    if (files && files.presetFile) {
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
