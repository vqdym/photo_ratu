import mongoose from 'mongoose';

export interface IPreset {
  name: string;
  description: string;
  price: number;
  imageBefore: string;
  imageAfter: string;
  presetFile?: string;
}

const presetSchema = new mongoose.Schema<IPreset>({
  name: {
    type: String,
    required: [true, 'Preset name is required'],
    unique: true,
  },
  description: String,
  price: {
    type: Number,
    required: [true, 'Preset price is required'],
  },
  imageBefore: {
    type: String,
    required: [true, 'Image before is required'],
  },
  imageAfter: {
    type: String,
    required: [true, 'Image after is required'],
  },
  presetFile: {
    type: String,
    required: [true, 'Preset file is required'],
  },
});

const Preset = mongoose.model<IPreset>('Preset', presetSchema);

export default Preset;
