import mongoose, { Schema, Document } from 'mongoose';

interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string; // New field for message status
}

const ContactSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'unseen' }, // Default status is 'unseen'
  },
  {
    timestamps: true,
  },
);

ContactSchema.index({ firstName: 'text', lastName: 'text', email: 'text', phone: 'text', subject: 'text' });

const ContactModel = mongoose.model<IContact>('Contact', ContactSchema);

export { ContactModel, IContact };
