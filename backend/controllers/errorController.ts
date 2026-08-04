import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

interface AppErrorType extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number;
  errors?: Record<string, { message: string }>;
  path?: string;
  value?: string;
  errmsg?: string;
}

function handleCastErrorDB(err: AppErrorType) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err: AppErrorType) {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
}

function handleValidationErrorDB(err: AppErrorType) {
  const errors = Object.values(err.errors ?? {}).map((el) => el.message);

  const message = `Invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
}

function handleJWTError() {
  return new AppError('Invalid token. Please log in again!', 401);
}

function handleJWTExpiredError() {
  return new AppError('Your token has expired! Please log in again.', 401);
}

function sendErrorDev(err: AppErrorType, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

function sendErrorProd(err: AppErrorType, res: Response) {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR', err);
    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
}

export default function globalErrorHandler(
  err: AppErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error: AppErrorType = { ...err };
    error.message = err.message;
    error.name = err.name;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
}
