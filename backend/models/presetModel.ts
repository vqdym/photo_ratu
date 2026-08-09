import mongoose from 'mongoose';

export interface IPreset {
  name: string;
  description?: string;
  price: number;
  presetFile?: string; // <-- Змінили downloadLink на presetFile
  examples: {
    beforeImage: string;
    afterImage: string;
  }[];
  createdAt: Date;
}

const presetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Write the name of the preset pack.'],
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: [true, 'Specify the price'],
  },
  presetFile: {
    // <-- Змінили тут також
    type: String,
  },
  examples: [
    {
      beforeImage: { type: String, required: true },
      afterImage: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Preset = mongoose.model<IPreset>('Preset', presetSchema);

export default Preset;
