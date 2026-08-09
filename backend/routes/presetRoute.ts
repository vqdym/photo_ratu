import express from 'express';
import {
  getAllPresets,
  uploadPresetData,
  setPresetFilesToBody,
  createPreset,
  deletePreset,
  getPresetById,
  updatePreset,
  updatePresetImagesAndFile,
} from '../controllers/presetController';
import { protect } from '../controllers/authController';
import orderRouter from './orderRoute';

const router = express.Router();

router.use('/:presetId/order', orderRouter);

router
  .route('/')
  .get(getAllPresets)
  .post(protect, uploadPresetData, setPresetFilesToBody, createPreset);

router
  .route('/:id')
  .delete(protect, deletePreset)
  .get(getPresetById)
  .patch(protect, uploadPresetData, updatePresetImagesAndFile, updatePreset);

export default router;
