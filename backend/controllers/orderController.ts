import { Response, Request, NextFunction } from 'express';

import Order from '../models/orderModel';
import {
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne,
} from './handlerFactory';

export const setPresetId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.preset) req.body.preset = req.params.presetId;
  next();
};

export const getAllOrders = getAll(Order);
export const createOrder = createOne(Order);
export const deleteOrder = deleteOne(Order);
export const getOrderById = getOne(Order, { path: 'preset' });
export const updateOrder = updateOne(Order);
