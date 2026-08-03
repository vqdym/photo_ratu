const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: [true, "Customer email is required"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  preset: {
    type: mongoose.Schema.ObjectId,
    ref: "Preset",
    required: [true, "Preset is required"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentId: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
