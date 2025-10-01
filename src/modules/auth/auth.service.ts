import { LoginInput } from '../../types/auth';
import { ApiError } from '../../utils/api-error';
import { comparePassword } from '../../utils/password';
import { UserModel } from '../user/user.model';
import { generateAccessToken } from '../../utils/jwt';

export class AuthService {
  login = async (data: LoginInput) => {
    const foundUser = await UserModel.findOne({
      username: data.username?.toLowerCase(),
    }).lean();

    if (!foundUser) {
      throw new ApiError(403, 'Нэвтрэх нэр эсвэл нууц үг буруу байна.');
    }

    const isMatchPasswords = await comparePassword(data.password, foundUser.password);

    if (!isMatchPasswords) {
      throw new ApiError(403, 'Нэвтрэх нэр эсвэл нууц үг буруу байна.');
    }

    const accessToken = generateAccessToken(foundUser._id.toString(), foundUser.role);

    return {
      accessToken,
      user: {
        _id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        profileImageUrl: foundUser.profileImageUrl,
      },
    };
  };
}
