import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

import Gallery from '../models/galleryModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import {
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne,
  deleteFromCloudinary,
  processAndUploadImage,
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

export const uploadGallery = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 50 },
]);

export const uploadGalleryImages = upload.fields([
  { name: 'images', maxCount: 50 },
]);

export const resizeGalleryPhotos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next();

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files.coverImage) {
      req.body.coverImage = await processAndUploadImage(
        files.coverImage[0].buffer,
        'photo_ratu/gallery',
        'cover',
      );
    }

    if (files.images) {
      req.body.images = [];
      await Promise.all(
        files.images.map(async (file, i) => {
          const url = await processAndUploadImage(
            file.buffer,
            'photo_ratu/gallery',
            `gallery-${Date.now()}-${i}`,
          );
          req.body.images.push(url);
        }),
      );
    }

    next();
  },
);

export const deleteGalleryPhotosFromCloudinary = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Gallery.findById(req.params.id);
    if (!doc) {
      return next(new AppError('Photo collection not found', 404));
    }

    if (doc.coverImage) {
      await deleteFromCloudinary(doc.coverImage);
    }

    if (doc.images && doc.images.length > 0) {
      await Promise.all(
        doc.images.map((imgUrl: string) => deleteFromCloudinary(imgUrl)),
      );
    }

    next();
  },
);

export const uploadNewImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Gallery.findById(req.params.id);
    if (!doc) {
      return next(new AppError('Photo collection not found', 404));
    }

    if (req.body.images) {
      req.body.images = [...doc.images, ...req.body.images];
    }

    next();
  },
);

export const editGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.deletedImages) {
      const imagesToDelete = Array.isArray(req.body.deletedImages)
        ? req.body.deletedImages
        : [req.body.deletedImages];

      await Promise.all(
        imagesToDelete.map((url: string) => deleteFromCloudinary(url)),
      );
    }

    if (!req.body.images) {
      return next(new AppError('No images provided for update', 400));
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { images: req.body.images },
      { new: true, runValidators: true },
    );

    if (!updatedGallery) {
      return next(new AppError('Gallery not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedGallery,
      },
    });
  },
);

export const checkIsCategoryInUse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryEn = req.params.category;

    const count = await Gallery.countDocuments({
      category: { $regex: `^${categoryEn}$`, $options: 'i' },
    });

    res.status(200).json({
      status: 'success',
      data: {
        isInUse: count > 0,
        count,
      },
    });
  },
);

export const getAllPhotos = getAll(Gallery);
export const createPhoto = createOne(Gallery);
export const deletePhoto = deleteOne(Gallery);
export const getPhotoById = getOne(Gallery);
export const updatePhoto = updateOne(Gallery);
