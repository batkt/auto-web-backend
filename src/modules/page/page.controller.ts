import { Request, Response, NextFunction } from 'express';
import { PageService } from './page.service';
import { sendSuccess } from '../../utils/response';
import { ApiError } from '../../utils/api-error';

export class PageController {
  static async getPageBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      const page = await PageService.getPageBySlug(slug);
      sendSuccess(res, page);
    } catch (error) {
      next(error);
    }
  }

  static async getPageList(req: Request, res: Response, next: NextFunction) {
    try {
      const pages = await PageService.getPageList();
      sendSuccess(res, pages);
    } catch (error) {
      next(error);
    }
  }

  static async getPageSections(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageKey } = req.params;
      if (!pageKey) {
        throw new ApiError(400, 'Page key is required');
      }
      const sections = await PageService.getPageSectionsByKey(pageKey);
      sendSuccess(res, sections);
    } catch (error) {
      next(error);
    }
  }

  static async updatePage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, keywords } = req.body;

      // Validate required fields
      if (!name || !description) {
        throw new ApiError(400, 'Name and description are required');
      }

      const updateData: any = {};

      if (name) {
        updateData.name = name;
      }

      if (description) {
        updateData.description = description;
      }

      if (keywords) {
        updateData.keywords = keywords;
      }

      const updatedPage = await PageService.updatePage(id, updateData);
      sendSuccess(res, updatedPage);
    } catch (error) {
      next(error);
    }
  }
}
