import { Request } from 'express';
import multer from 'multer';
import sharp from 'sharp';

import Gallery from '../models/galleryModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
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

export const uploadGalleryPhoto = upload.single('photo');
export const resizeGalleryPhoto = catchAsync(async (req, res, next) => {
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

export const getAllPhotos = getAll(Gallery);
export const createPhoto = createOne(Gallery);
export const deletePhoto = deleteOne(Gallery);
export const getPhotoById = getOne(Gallery);
export const updatePhoto = updateOne(Gallery);
