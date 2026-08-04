const express = require("express");
const galleryController = require("../controllers/galleryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(galleryController.getAllPhotos)
  .post(
    authController.protect,
    galleryController.uploadGalleryPhoto,
    galleryController.resizeGalleryPhoto,
    galleryController.createPhoto,
  );
router
  .route("/:id")
  .delete(authController.protect, galleryController.deletePhoto)
  .get(galleryController.getPhotoById)
  .patch(authController.protect, galleryController.updatePhoto);

module.exports = router;
