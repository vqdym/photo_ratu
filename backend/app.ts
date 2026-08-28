import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';

import AppError from './utils/appError';
import adminRouter from './routes/adminRoute';
import galleryRouter from './routes/galleryRoute';
import presetRouter from './routes/presetRoute';
import orderRouter from './routes/orderRoute';
import serviceRouter from './routes/serviceRoute';
import globalErrorHandler from './controllers/errorController';

const app = express();
app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 300,
  windowMs: 30 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later.',
});
// app.use('/api', limiter);

const mongoMiddleware = mongoSanitize();
const xssMiddleware = xss();

app.use((req: Request, res: Response, next: NextFunction) => {
  const fakeReq = {
    body: req.body,
    params: req.params,
    query: { ...req.query },
  };

  mongoMiddleware(fakeReq as Request, res, () => {
    xssMiddleware(fakeReq as Request, res, () => {
      if (req.body) req.body = fakeReq.body;
      if (req.params) req.params = fakeReq.params;

      if (req.query) {
        Object.keys(req.query).forEach((key) => delete req.query[key]);
        Object.assign(req.query, fakeReq.query);
      }
      next();
    });
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/gallery', galleryRouter);
app.use('/api/v1/preset', presetRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/service', serviceRouter);

app.all(/(.*)/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
