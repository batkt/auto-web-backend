import { Response } from 'express';

interface SuccessResponse {
  code: number;
  data: any;
}

interface ErrorResponse {
  code: number;
  message: string;
}

export const sendSuccess = (res: Response, data: any, code = 200) => {
  const response: SuccessResponse = {
    code,
    data,
  };
  return res.status(200).json(response);
};

export const sendError = (res: Response, message: string, code = 500) => {
  const response: ErrorResponse = {
    code,
    message,
  };
  return res.status(200).json(response);
};

export const sendSystemError = (res: Response, error: any) => {
  return res.status(500).json(error);
};
