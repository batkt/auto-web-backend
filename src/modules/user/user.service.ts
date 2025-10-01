import { AuthUser, User, UserInput } from '../../types/user';
import { ApiError } from '../../utils/api-error';
import { hashPassword } from '../../utils/password';
import { UserModel } from './user.model';

export class UserService {
  createUser = async (authUser: AuthUser, data: UserInput) => {
    const foundUser = await UserModel.findOne({
      username: data.username,
    });

    if (foundUser) {
      throw new ApiError(500, 'Нэвтрэх нэр бүртгэлтэй байна.');
    }

    const hp = await hashPassword('12345678');

    await UserModel.create({
      ...data,
      password: hp,
      createdBy: authUser.id,
      passwordGenerated: true,
    });

    return true;
  };

  getProfile = async (userId: string): Promise<User> => {
    const foundUser = await UserModel.findById(userId).lean();

    if (!foundUser) {
      throw new ApiError(404, 'Хэрэглэгчийн мэдээлэл олдсонгүй');
    }

    return {
      _id: foundUser._id.toString(),
      username: foundUser.username,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      profileImageUrl: foundUser.profileImageUrl,
      role: foundUser.role,
    };
  };

  updateUser = async (authUser: AuthUser, userId: string, data: Partial<UserInput>) => {
    const foundUser = await UserModel.findById(userId).lean();

    if (!foundUser) {
      throw new ApiError(404, 'Хэрэглэгчийн мэдээлэл олдсонгүй');
    }

    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          ...data,
        },
      },
    );

    return true;
  };

  deleteUser = async (authUser: AuthUser, userId: string) => {
    const foundUser = await UserModel.findById(userId).lean();

    if (!foundUser) {
      throw new ApiError(404, 'Хэрэглэгчийн мэдээлэл олдсонгүй');
    }

    await UserModel.deleteOne({
      _id: userId,
    });
    return true;
  };

  resetPassword = async (authUser: AuthUser, userId: string) => {
    const foundUser = await UserModel.findById(userId).lean();

    if (!foundUser) {
      throw new ApiError(404, 'Хэрэглэгчийн мэдээлэл олдсонгүй');
    }

    const hp = await hashPassword('12345678');

    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          password: hp,
          passwordGenerated: true,
        },
      },
    );
  };

  getUsers = async () => {
    return UserModel.find()
      .select('-password -__v')
      .populate({
        path: 'createdBy', // ямар field-ийг populate хийх вэ
        select: '-password -__v', // зөвхөн ямар талбаруудыг авах вэ (optional)
      })
      .lean();
  };
}
