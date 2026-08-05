import { Request, Response, NextFunction } from 'express';
import { Model, PopulateOptions } from 'mongoose';

import apiFeatures from '../utils/apiFeatures';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import cloudinary from '../utils/cloudinary';
import processAndUploadImage from '../utils/processAndUploadImage';

export const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getOne = <T>(
  Model: Model<T>,
  popOptions?: PopulateOptions | PopulateOptions[],
) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getAll = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const features = new apiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .category()
      .paginate();

    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

interface HasImageUrl {
  imageUrl: string;
}
export const deleteCloudinaryPhoto = <T extends HasImageUrl>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    const photo = await Model.findById(req.params.id);
    if (!photo) {
      return next(new AppError('Photo not found', 404));
    }

    const splittedPath = photo?.imageUrl.split('/');
    const index = splittedPath?.indexOf('photo_ratu');

    if (index === -1) {
      return next(new AppError('Invalid Cloudinary URL', 400));
    }

    const publicId = splittedPath
      ?.slice(index)
      .join('/')
      .replace(/\.[^.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
    next();
  });

export const updateCloudinaryPhoto = <T extends HasImageUrl>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const photo = await Model.findById(req.params.id);
    if (!photo) {
      return next(new AppError('Photo not found', 404));
    }

    const splittedPath = photo?.imageUrl.split('/');
    const index = splittedPath?.indexOf('photo_ratu');

    if (index === -1) {
      return next(new AppError('Invalid Cloudinary URL', 400));
    }

    const publicId = splittedPath
      ?.slice(index)
      .join('/')
      .replace(/\.[^.]+$/, '');

    await cloudinary.uploader.destroy(publicId);

    req.body.imageUrl = await processAndUploadImage(
      req.file?.buffer,
      `photo_ratu/${Model.modelName.toLowerCase()}`,
      Model.modelName.toLowerCase(),
    );

    next();
  });

export const checkImageData = <T extends HasImageUrl>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.name) {
      const existingService = await Model.findOne({ name: req.body.name });

      if (existingService) {
        return next(
          new AppError(
            `${Model.modelName} with this name already exists!`,
            400,
          ),
        );
      }
    }
    next();
  });
