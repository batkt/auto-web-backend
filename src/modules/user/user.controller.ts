import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response';
import { UserService } from './user.service';

export class UserController {
  private userService;
  constructor() {
    this.userService = new UserService();
  }
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUser = req.user!;
      const profile = await this.userService.getProfile(authUser.id);
      sendSuccess(res, profile);
    } catch (err) {
      next(err);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const authUser = req.user!;
      const profile = await this.userService.getUsers();
      sendSuccess(res, profile);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUser = req.user!;
      const result = await this.userService.createUser(authUser, req.body);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUser = req.user!;
      const userId = req.params.userId;
      const result = await this.userService.updateUser(authUser, userId, req.body);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUser = req.user!;
      const userId = req.params.userId;
      const result = await this.userService.deleteUser(authUser, userId);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  resetPasswordUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUser = req.user!;
      const userId = req.params.userId;
      const result = await this.userService.resetPassword(authUser, userId);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };
}
