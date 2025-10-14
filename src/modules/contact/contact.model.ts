import mongoose, { Schema, Document } from 'mongoose';

interface IContact extends Document {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  status: string; // New field for message status
}

const ContactSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'unseen' }, // Default status is 'unseen'
  },
  {
    timestamps: true,
  },
);

ContactSchema.index({
  firstName: 'text',
  email: 'text',
  phone: 'text',
  message: 'text',
});

const ContactModel = mongoose.model<IContact>('Contact', ContactSchema);

export { ContactModel, IContact };
