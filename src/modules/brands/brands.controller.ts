import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response';
import { ApiError } from '../../utils/api-error';
import { BrandService } from './brands.service';

export class BrandController {
  static async createBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;

      if (!name) {
        throw new ApiError(400, 'Brand name is required');
      }

      const brandData = {
        name,
        description: description || '',
      };

      const brand = await BrandService.createBrand(brandData);
      sendSuccess(res, brand);
    } catch (error) {
      next(error);
    }
  }
  static async getBrandById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const brand = await BrandService.getBrandById(id);
      sendSuccess(res, brand);
    } catch (error) {
      next(error);
    }
  }
  static async getBrandList(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await BrandService.getBrandList();
      sendSuccess(res, brands);
    } catch (error) {
      next(error);
    }
  }
  static async updateBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updateData: any = {};

      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;

      const brand = await BrandService.updateBrand(id, updateData);
      sendSuccess(res, brand);
    } catch (error) {
      next(error);
    }
  }
  static async deleteBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BrandService.deleteBrand(id);
      sendSuccess(res, { message: 'Brand deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
