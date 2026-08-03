const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
