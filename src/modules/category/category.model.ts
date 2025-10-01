import mongoose, { Schema } from 'mongoose';
import { CategoryDocument } from '../../types/category';

const categorySchema = new Schema<CategoryDocument>(
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

export const CategoryModel = mongoose.model<CategoryDocument>('Category', categorySchema);
