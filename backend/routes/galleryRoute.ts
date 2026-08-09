import express from 'express';
import {
  uploadGalleryImages,
  resizeGalleryPhotos,
  createPhoto,
  getAllPhotos,
  deletePhoto,
  getPhotoById,
  updatePhoto,
  deleteGalleryPhotosFromCloudinary,
  cleanupOldGalleryPhotos,
} from '../controllers/galleryController';
import { protect } from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(getAllPhotos)
  .post(protect, uploadGalleryImages, resizeGalleryPhotos, createPhoto);

router
  .route('/:id')
  .delete(protect, deleteGalleryPhotosFromCloudinary, deletePhoto)
  .get(getPhotoById)
  .patch(
    protect,
    uploadGalleryImages,
    resizeGalleryPhotos,
    cleanupOldGalleryPhotos,
    updatePhoto,
  );

export default router;
