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
  uploadNewImages,
  editGallery,
  uploadGallery,
  checkIsCategoryInUse,
} from '../controllers/galleryController';
import { protect } from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(getAllPhotos)
  .post(protect, uploadGallery, resizeGalleryPhotos, createPhoto);

router.route('/check-category/:category').get(protect, checkIsCategoryInUse);

router
  .route('/:id')
  .delete(protect, deleteGalleryPhotosFromCloudinary, deletePhoto)
  .get(getPhotoById)
  .patch(
    protect,
    uploadGalleryImages,
    resizeGalleryPhotos,
    uploadNewImages,
    updatePhoto,
  );

router.route('/:id/manage-photos').patch(protect, editGallery);

export default router;
