import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response';
import { ApiError } from '../../utils/api-error';

import { ProductService } from './product.service';

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { proModel, name, desc, size, blocks, brand, qty, price, productImg, language } = req.body;
      if (!blocks || !Array.isArray(blocks)) {
        throw new ApiError(400, 'blocks must be an array');
      }

      if (!proModel || !name || !blocks || price === undefined || !productImg) {
        throw new ApiError(400, 'proModel, name, price, productImg are required');
      }

      if (Number(price) < 0) throw new ApiError(400, 'price cannot be negative');
      if (qty !== undefined && Number(qty) < 0) throw new ApiError(400, 'qty cannot be negative');
      const productData = {
        proModel,
        name,
        desc,
        size,
        price,
        brand: brand || [],
        blocks,
        productImg,
        qty,
        language: language || 'mn',
      };
      const product = await ProductService.createProduct(productData);
      sendSuccess(res, product);
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      sendSuccess(res, product);
    } catch (err) {
      next(err);
    }
  }

  static async getProductByProModel(req: Request, res: Response, next: NextFunction) {
    try {
      const { proModel } = req.params;
      const product = await ProductService.getProductByProModel(proModel);
      sendSuccess(res, product);
    } catch (err) {
      next(err);
    }
  }

  static async getProductList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProductService.getProductList(req.query);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { proModel, name, desc, size, blocks, status, qty, price, productImg, stock, language, publishedAt } =
        req.body;

      const payload: any = {};

      if (proModel !== undefined) payload.proModel = String(proModel).trim();
      if (name !== undefined) payload.name = String(name).trim();
      if (desc !== undefined) payload.desc = desc;
      if (size !== undefined) payload.size = size;
      if (blocks !== undefined) payload.blocks = Array.isArray(blocks) ? blocks : [];
      if (status !== undefined) payload.status = status;

      if (qty !== undefined) {
        if (Number(qty) < 0) throw new ApiError(400, 'qty cannot be negative');
        payload.qty = Number(qty);
      }

      if (price !== undefined) {
        if (Number(price) < 0) throw new ApiError(400, 'price cannot be negative');
        payload.price = Number(price);
      }

      if (productImg !== undefined) payload.productImg = String(productImg).trim();
      if (stock !== undefined) payload.stock = !!stock;
      if (language !== undefined) payload.language = language;
      if (publishedAt !== undefined) payload.publishedAt = publishedAt ? new Date(publishedAt) : null;

      const product = await ProductService.updateProduct(id, payload);
      sendSuccess(res, product);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      sendSuccess(res, null);
    } catch (err) {
      next(err);
    }
  }
  static async publishProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.publishProduct(id);
      sendSuccess(res, product);
    } catch (err) {
      next(err);
    }
  }

  static async unpublishProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.unpublishProduct(id);
      sendSuccess(res, product);
    } catch (err) {
      next(err);
    }
  }
}
