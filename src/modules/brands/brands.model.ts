import mongoose, { Schema } from 'mongoose';
import { BrandDocument } from '../../types/brands';

const brandSchema = new Schema<BrandDocument>(
  {
    name: {
      en: { type: String, required: true, trim: true },
      mn: { type: String, required: true, trim: true },
    },
    description: {
      en: { type: String, trim: true, default: '' },
      mn: { type: String, trim: true, default: '' },
    },
  },
  {
    timestamps: true,
  },
);

export const BrandModel = mongoose.model<BrandDocument>('Brand', brandSchema);
