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
  deleteServicePhotoFromCloudinary,
  updateServicePhotoOnCloudinary,
  checkServiceData,
} from '../controllers/serviceController';

const router = express.Router();

router
  .route('/')
  .get(getAllServices)
  .post(
    protect,
    uploadServicePhoto,
    checkServiceData,
    resizeServicePhoto,
    createService,
  );
router
  .route('/:id')
  .delete(protect, deleteServicePhotoFromCloudinary, deleteService)
  .get(getServiceById)
  .patch(
    protect,
    uploadServicePhoto,
    updateServicePhotoOnCloudinary,
    updateService,
  );

export default router;
