const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.protect, orderController.getAllOrders)
  .post(orderController.setPresetId, orderController.createOrder);
router
  .route("/:id")
  .get(authController.protect, orderController.getOrderById)
  .patch(authController.protect, orderController.updateOrder)
  .delete(authController.protect, orderController.deleteOrder);

module.exports = router;
