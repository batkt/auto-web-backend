import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { env } from '../config/env';

interface TokenPayload {
  sub: string; // user ID
  role: string; // optional role/permission
  scope?: string[]; // optional scopes/permissions
}

export const generateAccessToken = (userId: string, role: string, scope?: string[]): string => {
  const payload: TokenPayload = {
    sub: userId,
    role,
    ...(scope && { scope }),
  };

  const options: SignOptions = {
    expiresIn: env.jwt.ttl,
    issuer: 'church-backend-service',
  };

  return jwt.sign(payload, env.jwt.secret, options);
};

export const verifyToken = (token: string): TokenPayload => {
  const options: VerifyOptions = {
    issuer: 'church-backend-service',
  };

  try {
    return jwt.verify(token, env.jwt.secret, options) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw error;
  }
};
