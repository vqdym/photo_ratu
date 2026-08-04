import express from 'express';
import {
  uploadGalleryPhoto,
  resizeGalleryPhoto,
  createPhoto,
  getAllPhotos,
  deletePhoto,
  getPhotoById,
  updatePhoto,
} from '../controllers/galleryController';
import { protect } from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(getAllPhotos)
  .post(protect, uploadGalleryPhoto, resizeGalleryPhoto, createPhoto);
router
  .route('/:id')
  .delete(protect, deletePhoto)
  .get(getPhotoById)
  .patch(protect, updatePhoto);

export default router;
