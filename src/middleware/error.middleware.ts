import { Request, Response, NextFunction } from 'express';
import { sendError, sendSystemError } from '../utils/response';
import { ApiError } from '../utils/api-error';

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return sendError(res, err.message, err.statusCode);
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  // For system errors, send 500 with full error details
  return sendSystemError(res, {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
