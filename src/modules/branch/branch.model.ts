import mongoose, { Schema, Document } from 'mongoose';

export interface IBranch extends Document {
  name: string;
  fullAddress: string;
  phone: string;
  email: string;
  services: string[];
  image: string;
  coordinates: [number, number];
  pastor?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const branchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fullAddress: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    services: [
      {
        type: String,
        trim: true,
      },
    ],
    image: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v: number[]) {
          return v.length === 2 && v[0] >= -90 && v[0] <= 90 && v[1] >= -180 && v[1] <= 180;
        },
        message: 'Coordinates must be an array of 2 numbers: [latitude, longitude]',
      },
    },
    pastor: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create index for better query performance
branchSchema.index({ name: 1 });
branchSchema.index({ email: 1 });

export const BranchModel = mongoose.model<IBranch>('Branch', branchSchema);
