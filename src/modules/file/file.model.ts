import { Schema, model, Document, Types } from 'mongoose';

export interface IFileMetadata extends Document {
  duration?: number;
  mimetype: string;
  size: number;
}

const metadataSchema = new Schema<IFileMetadata>({
  duration: { type: Number },
  mimetype: { type: String },
  size: { type: Number },
});

export interface IFile extends Document {
  originalName: string;
  filename: string;
  url: string;
  isActive: boolean;
  metadata: IFileMetadata;
  uploadedBy?: Types.ObjectId; // Хэн үүсгэсэн
}

const fileSchema = new Schema<IFile>(
  {
    originalName: { type: String, required: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
    metadata: {
      type: metadataSchema,
      required: true,
    },
    isActive: { type: Boolean, required: true, default: false },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  },
);

export const FileModel = model<IFile>('file', fileSchema);
