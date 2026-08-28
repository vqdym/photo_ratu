import express from 'express';
import { protect } from '../controllers/authController';
import {
  createService,
  deleteService,
  getServiceById,
  updateService,
  uploadServicePhoto,
  resizeServicePhoto,
  deleteServicePhotoFromCloudinary,
  updateServicePhotoOnCloudinary,
  checkServiceData,
  editService,
  getActiveServices,
  getAllServicesAdmin,
  getServicesNames,
} from '../controllers/serviceController';

const router = express.Router();

router
  .route('/')
  .post(
    protect,
    uploadServicePhoto,
    checkServiceData,
    resizeServicePhoto,
    createService,
  );

router.route('/active-services').get(getActiveServices);
router.route('/services-names').get(getServicesNames);
router.route('/all-services').get(protect, getAllServicesAdmin);

router.route('/manage-prices').patch(protect, editService);
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
