import express from 'express';
import {
  getAllOrders,
  setPresetId,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';
import { protect } from '../controllers/authController';

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getAllOrders).post(setPresetId, createOrder);
router
  .route('/:id')
  .get(protect, getOrderById)
  .patch(protect, updateOrder)
  .delete(protect, deleteOrder);

export default router;
