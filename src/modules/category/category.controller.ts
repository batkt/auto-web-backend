import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './category.service';
import { sendSuccess } from '../../utils/response';
import { ApiError } from '../../utils/api-error';

export class CategoryController {
  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;

      if (!name) {
        throw new ApiError(400, 'Category name is required');
      }

      const categoryData = {
        name,
        description: description || '',
      };

      const category = await CategoryService.createCategory(categoryData);
      sendSuccess(res, category);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      sendSuccess(res, category);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryList(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategoryList();
      sendSuccess(res, categories);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updateData: any = {};

      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;

      const category = await CategoryService.updateCategory(id, updateData);
      sendSuccess(res, category);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(id);
      sendSuccess(res, null);
    } catch (error) {
      next(error);
    }
  }
}
