import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import multer from 'multer';

import Service from '../models/serviceModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import cloudinary from '../utils/cloudinary';
import {
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne,
} from './handlerFactory';

const multerStorage = multer.memoryStorage();
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadServicePhoto = upload.single('photo');
export const resizeServicePhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const buffer = await sharp(req.file.buffer)
      .resize(1200, 800)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'photo_ratu/services',
          public_id: `service-${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(buffer);
    });
    const result: any = await uploadPromise;
    req.body.imageUrl = result.secure_url;
    next();
  },
);

export const getAllServices = getAll(Service);
export const createService = createOne(Service);
export const deleteService = deleteOne(Service);
export const getServiceById = getOne(Service);
export const updateService = updateOne(Service);
