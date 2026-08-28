import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import Service from '../models/serviceModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import {
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne,
  deleteCloudinaryPhoto,
  processAndUploadImage,
  updateCloudinaryPhoto,
  checkImageData,
  deleteFromCloudinary,
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

    req.body.imageUrl = await processAndUploadImage(
      req.file.buffer,
      'photo_ratu/service',
      'service',
    );
    next();
  },
);

export const editService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.archivedIds && req.body.archivedIds.length > 0) {
      await Service.updateMany(
        { _id: { $in: req.body.archivedIds } },
        { isActive: false },
      );
    }

    if (req.body.restoredIds && req.body.restoredIds.length > 0) {
      await Service.updateMany(
        { _id: { $in: req.body.restoredIds } },
        { isActive: true },
      );
    }

    if (req.body.deletedIds && req.body.deletedIds.length > 0) {
      const servicesToDelete = await Service.find({
        _id: { $in: req.body.deletedIds },
      });

      const imagesToDelete = servicesToDelete
        .map((service) => service.imageUrl)
        .filter((url) => Boolean(url));

      if (imagesToDelete.length > 0) {
        await Promise.all(
          imagesToDelete.map((url: string) => deleteFromCloudinary(url)),
        );
      }

      await Service.deleteMany({ _id: { $in: req.body.deletedIds } });
    }

    if (req.body.services && req.body.services.length > 0) {
      const updatePromises = req.body.services.map(
        (service: any, index: number) => {
          return Service.findByIdAndUpdate(service._id, { index: index });
        },
      );

      await Promise.all(updatePromises);
    }

    res.status(200).json({
      status: 'success',
      message: 'Prices successfully updated, archived, and deleted.',
    });
  },
);

export const getActiveServices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const services = await Service.find({ isActive: { $ne: false } }).sort(
      'index',
    );

    res.status(200).json({
      status: 'success',
      results: services.length,
      data: { data: services },
    });
  },
);

export const getAllServicesAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const services = await Service.find({}).sort('index');

    res.status(200).json({
      status: 'success',
      results: services.length,
      data: { data: services },
    });
  },
);

export const getServicesNames = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const services = await Service.find({}).select('name nameEn index');

    res.status(200).json({
      status: 'success',
      results: services.length,
      data: { data: services },
    });
  },
);

// export const getAllServices = getAll(Service);
export const createService = createOne(Service);
export const deleteService = deleteOne(Service);
export const getServiceById = getOne(Service);
export const updateService = updateOne(Service);
export const deleteServicePhotoFromCloudinary = deleteCloudinaryPhoto(Service);
export const updateServicePhotoOnCloudinary = updateCloudinaryPhoto(Service);
export const checkServiceData = checkImageData(Service);
