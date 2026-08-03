const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  altText: {
    type: String,
    default: "Photo for portfolio",
  },
  category: {
    type: String,
    default: "All",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
