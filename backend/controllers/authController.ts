import { Request, Response, NextFunction } from 'express';
import { Document, HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import Admin from '../models/adminModel';
import AppError from '../utils/appError';
import { IAdmin } from '../models/adminModel';

function signToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
}

function createSendToken(
  admin: HydratedDocument<IAdmin>,
  statusCode: number,
  res: Response,
) {
  const token = signToken(admin._id.toString());

  const cookieOptions: {
    expires: Date;
    httpOnly: boolean;
    secure?: boolean;
  } = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', 'token', cookieOptions);

  admin.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      admin,
    },
  });
}

export const signupAdmin = catchAsync(async (req, res, next) => {
  const adminUser = await Admin.create(req.body);
  createSendToken(adminUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.correctPassword(password, admin.password!))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(admin, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(new AppError('JWT_SECRET is missing', 500));
  }

  const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

  const currentAdmin = await Admin.findById(decoded.id);
  if (!currentAdmin) {
    return next(
      new AppError(
        'The user belongign to this token does no longer exist',
        401,
      ),
    );
  }

  req.admin = currentAdmin;
  next();
});
