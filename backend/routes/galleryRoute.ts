import express from 'express';
import {
  uploadGalleryPhoto,
  resizeGalleryPhoto,
  createPhoto,
  getAllPhotos,
  deletePhoto,
  getPhotoById,
  updatePhoto,
  deletePhotoFromCloudinary,
  updateGalleryPhotoOnCloudinary,
  checkGalleryData,
} from '../controllers/galleryController';
import { protect } from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(getAllPhotos)
  .post(
    protect,
    uploadGalleryPhoto,
    checkGalleryData,
    resizeGalleryPhoto,
    createPhoto,
  );
router
  .route('/:id')
  .delete(protect, deletePhotoFromCloudinary, deletePhoto)
  .get(getPhotoById)
  .patch(
    protect,
    uploadGalleryPhoto,
    updateGalleryPhotoOnCloudinary,
    updatePhoto,
  );

export default router;
