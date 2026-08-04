const express = require("express");
const presetController = require("../controllers/presetController");
const authController = require("../controllers/authController");
const orderRouter = require("./orderRoute");

const router = express.Router();

router.use("/:presetId/order", orderRouter);

router
  .route("/")
  .get(presetController.getAllPresets)
  .post(authController.protect, presetController.createPreset);

router
  .route("/:id")
  .delete(authController.protect, presetController.deletePreset)
  .get(presetController.getPresetById)
  .patch(authController.protect, presetController.updatePreset);

module.exports = router;
