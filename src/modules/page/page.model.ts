import mongoose, { Schema } from 'mongoose';
import { PageDocument, MultilingualText } from '../../types/page';

const multilingualTextSchema = new Schema<MultilingualText>(
  {
    mn: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false },
);

const pageSchema = new Schema<PageDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: multilingualTextSchema,
      required: true,
    },
    description: {
      type: multilingualTextSchema,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const PageModel = mongoose.model<PageDocument>('Page', pageSchema);
