import mongoose from 'mongoose';
import { env } from './env';
import { UserModel } from '../modules/user/user.model';
import { hashPassword } from '../utils/password';
import { UserRoles } from '../types/user';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('✅ Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(env.database.url);

    isConnected = true;
    console.log('✅ Database connected');

    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      const hp = await hashPassword(env.database.defaultUserPassword);

      await UserModel.create({
        username: 'admin',
        firstname: 'Admin',
        lastname: 'System',
        password: hp,
        role: UserRoles.SUPER_ADMIN,
      });

      console.log('✨ Default admin user created');
    }
  } catch (error) {
    console.error('❌ Failed to connect to database', error);
    throw error;
  }
}

export { mongoose };
