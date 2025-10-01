import { Schema, model, Document, Types } from 'mongoose';
import { UserRoles } from '../../types/user';

export interface IUser extends Document {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  role: UserRoles;
  profileImageUrl?: string;
  passwordGenerated: boolean;
  profileImageFileId?: Types.ObjectId;
  createdBy?: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    passwordGenerated: { type: Boolean, default: true },
    profileImageUrl: { type: String },
    profileImageFileId: { type: Schema.Types.ObjectId, ref: 'file' },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.USER,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>('user', userSchema);
