import mongoose, { Schema } from 'mongoose';
import { BlogDocument, Block } from '../../types/blog';

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

const blogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    thumbImage: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    blocks: [blockSchema],
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    language: {
      type: String,
      default: 'mn',
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = mongoose.model<BlogDocument>('Blog', blogSchema);
