import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';
import { verifyToken } from '../utils/jwt';
import { AuthUser } from '../types/user';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(401, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Unauthorized');
    }

    try {
      const decoded = verifyToken(token);
      req.user = { id: decoded.sub, role: decoded.role };
      next();
    } catch (error) {
      console.log(error);
      throw new ApiError(401, 'Unauthorized');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
