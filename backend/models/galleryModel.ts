import mongoose from 'mongoose';

export interface IGallery {
  imageUrl: string;
  altText: string;
  category: string;
  createdAt: Date;
}

const gallerySchema = new mongoose.Schema<IGallery>({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  altText: {
    type: String,
    default: 'Photo for portfolio',
  },
  category: {
    type: String,
    default: 'All',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);

export default Gallery;
