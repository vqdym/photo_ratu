import express from 'express';
import { protect } from '../controllers/authController';
import {
  createService,
  getAllServices,
  deleteService,
  getServiceById,
  updateService,
  uploadServicePhoto,
  resizeServicePhoto,
} from '../controllers/serviceController';

const router = express.Router();

router
  .route('/')
  .get(getAllServices)
  .post(protect, uploadServicePhoto, resizeServicePhoto, createService);
router
  .route('/:id')
  .delete(protect, deleteService)
  .get(getServiceById)
  .patch(protect, updateService);

export default router;
