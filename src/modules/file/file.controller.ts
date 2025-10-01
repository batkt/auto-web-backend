import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response';
import { ApiError } from '../../utils/api-error';
import { FileService } from './file.service';

export class FileController {
  static async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
      }

      const uploadedBy = req.user?.id;
      const file = await FileService.uploadFile(req.file, uploadedBy);

      sendSuccess(res, file, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, isActive } = req.query;
      const files = await FileService.getFiles({
        page: Number(page),
        limit: Number(limit),
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      });

      sendSuccess(res, files);
    } catch (error) {
      next(error);
    }
  }

  static async getFileById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const file = await FileService.getFileById(id);
      sendSuccess(res, file);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await FileService.deleteFile(id);
      sendSuccess(res, { message: 'File deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async updateFileStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const file = await FileService.updateFileStatus(id, isActive);
      sendSuccess(res, file);
    } catch (error) {
      next(error);
    }
  }
}
