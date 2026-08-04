import mongoose, { Types } from 'mongoose';
import validator from 'validator';

export interface IOrder {
  customerEmail: string;
  preset: Types.ObjectId;
  isPaid: boolean;
  paymentId?: string;
}

const orderSchema = new mongoose.Schema<IOrder>({
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  preset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preset',
    required: [true, 'Preset is required'],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentId: {
    type: String,
    default: '',
  },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
