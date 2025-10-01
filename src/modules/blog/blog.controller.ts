import { Request, Response, NextFunction } from 'express';
import { BlogService } from './blog.service';
import { sendSuccess } from '../../utils/response';
import { ApiError } from '../../utils/api-error';
import { Types } from 'mongoose';

export class BlogController {
  // Blog endpoints
  static async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, thumbImage, categories, blocks, language } = req.body;

      // Validate required fields
      if (!title || !thumbImage || !blocks) {
        throw new ApiError(400, 'Title, thumbImage, and blocks are required');
      }

      const blogData = {
        title,
        thumbImage,
        categories: categories || [],
        blocks,
        language: language || 'mn',
        author: req.user?.id ? new Types.ObjectId(req.user.id) : undefined, // From auth middleware
      };

      const blog = await BlogService.createBlog(blogData);
      sendSuccess(res, blog);
    } catch (error) {
      next(error);
    }
  }

  static async getBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await BlogService.getBlogById(id);
      sendSuccess(res, blog);
    } catch (error) {
      next(error);
    }
  }

  static async getBlogList(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs = await BlogService.getBlogList({ ...req.query, language: req.query.language });
      sendSuccess(res, blogs);
    } catch (error) {
      next(error);
    }
  }

  static async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, thumbImage, categories, blocks, status } = req.body;

      const updateData: any = {};

      if (title !== undefined) updateData.title = title;
      if (thumbImage !== undefined) updateData.thumbImage = thumbImage;
      if (categories !== undefined) updateData.categories = categories;
      if (blocks !== undefined) updateData.blocks = blocks;
      if (status !== undefined) updateData.status = status;

      const blog = await BlogService.updateBlog(id, updateData);
      sendSuccess(res, blog);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BlogService.deleteBlog(id);
      sendSuccess(res, null);
    } catch (error) {
      next(error);
    }
  }

  static async publishBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await BlogService.publishBlog(id);
      sendSuccess(res, blog);
    } catch (error) {
      next(error);
    }
  }

  static async unpublishBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await BlogService.unpublishBlog(id);
      sendSuccess(res, blog);
    } catch (error) {
      next(error);
    }
  }
}
