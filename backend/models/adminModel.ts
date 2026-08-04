import mongoose, { Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  email: string;
  password?: string | undefined;
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
  },
});

adminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return;

  this.password = await bcrypt.hash(this.password, 14);
});

adminSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
