import mongoose from 'mongoose';

export interface IGallery {
  title: string;
  coverImage: string;
  category: 'individual' | 'wedding' | 'family' | 'couple' | 'commercial';
  images: string[];
  createdAt: Date;
}

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The photoshoot must have a title.'],
    trim: true,
  },
  coverImage: {
    type: String,
    required: [true, 'The photoshoot needs a cover.'],
  },
  images: [String],
  category: {
    type: String,
    required: [true, 'Категорія є обовʼязковою'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery =
  mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', gallerySchema);

export default Gallery;
