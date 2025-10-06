import mongoose, { Schema } from 'mongoose';
import { ProductDocument, Block } from '../../types/product';

const blockSchema = new Schema<Block>(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['text', 'image', 'video', 'gallery'],
    },

    content: { type: String },
    url: { type: String },
    data: {
      id: { type: String },
      url: { type: String },
      alt: { type: String },
    },
    images: [{ type: String }],
  },
  { _id: false },
);

const productSchema = new Schema<ProductDocument>({
  proModel: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
    },
  ],

  desc: { type: String, default: '' },
  size: { type: Array, trim: true },
  blocks: [blockSchema],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'draft',
  },
  qty: { type: Number, required: true, min: [0, 'qty cannot be negative'], default: 0 },
  price: { type: Number, required: true, min: [0, 'price cannot be negative'] },
  productImg: { type: String, required: true, trim: true },
  language: {
    type: String,
    default: 'mn',
  },

  publishedAt: {
    type: Date,
  },
});

export const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);
