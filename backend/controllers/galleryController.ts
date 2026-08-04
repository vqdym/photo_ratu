import { Request } from 'express';
import multer from 'multer';
import sharp from 'sharp';

import Gallery from '../models/galleryModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import cloudinary from '../utils/cloudinary';
import {
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne,
} from './handlerFactory';
import { resolve } from 'node:dns';

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

export const uploadGalleryPhoto = upload.single('photo');
export const resizeGalleryPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const buffer = await sharp(req.file.buffer)
    .resize(1200, 800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  const uploadPromise = new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'photo_ratu/gallery',
        public_id: `gallery-${Date.now()}`,
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
});

export const getAllPhotos = getAll(Gallery);
export const createPhoto = createOne(Gallery);
export const deletePhoto = deleteOne(Gallery);
export const getPhotoById = getOne(Gallery);
export const updatePhoto = updateOne(Gallery);
