import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  nameEn: string;
  price: number;
  imageUrl: string;
  description: string;
  features: string[];
  duration?: string;
  index: number;
  isActive?: boolean;
}

// 2. Схема Mongoose
const serviceSchema = new mongoose.Schema<IService>({
  name: {
    type: String,
    required: [true, 'Service must have a name'],
    unique: true,
    trim: true,
  },
  nameEn: {
    type: String,
    required: [true, 'Англійська назва є обовʼязковою'],
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
  index: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// serviceSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
//   this.find({ isActive: { $ne: false } });
// });

// 3. Експорт моделі
const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;
