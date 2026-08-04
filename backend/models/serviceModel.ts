import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  features: string[];
  duration?: string;
  isActive: boolean;
}

// 2. Схема Mongoose
const serviceSchema = new mongoose.Schema<IService>({
  name: {
    type: String,
    required: [true, 'Service must have a name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Service must have a price'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Service must have a cover image'],
  },
  description: {
    type: String,
    required: [true, 'Service must have a description'],
    trim: true,
  },
  features: {
    type: [String],
    required: [true, 'Service must have at least one feature'],
  },
  duration: {
    type: String,
    default: '1 година',
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  },
});

serviceSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.find({ isActive: { $ne: false } });
});

// 3. Експорт моделі
const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;
