import { BlogModel } from './blog.model';
import { BlogDocument, BlogData } from '../../types/blog';
import { ApiError } from '../../utils/api-error';
import { Types } from 'mongoose';

export class BlogService {
  // Blog methods
  static async createBlog(blogData: BlogData): Promise<BlogDocument> {
    const blog = new BlogModel(blogData);
    return await blog.save();
  }

  static async getBlogById(id: string): Promise<BlogDocument> {
    try {
      const blog = await BlogModel.findById(id)
        .populate('categories', '_id name')
        .populate('author', 'username firstname lastname');

      if (!blog) {
        throw new ApiError(404, 'Blog not found');
      }

      return blog;
    } catch (error) {
      throw new ApiError(404, 'Blog not found');
    }
  }

  static async getBlogList(query: any = {}): Promise<{
    data: BlogDocument[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const { status, category, page = 1, limit = 10, search } = query;

    let filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (category && category !== 'all') {
      filter.categories = new Types.ObjectId(category);
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (query.language) {
      filter.language = query.language;
    }

    const skip = (page - 1) * limit;

    const blogs = await BlogModel.find(filter)
      .populate('categories', '_id name')
      .populate('author', 'username firstname lastname')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogModel.countDocuments(filter);

    return { data: blogs, total, totalPages: Math.ceil(total / limit), currentPage: page };
  }

  static async updateBlog(id: string, updateData: Partial<BlogData>): Promise<BlogDocument> {
    const blog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .populate('categories', '_id name')
      .populate('author', 'username firstname lastname');

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    return blog;
  }

  static async deleteBlog(id: string): Promise<void> {
    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }
  }

  static async publishBlog(id: string): Promise<BlogDocument> {
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      {
        status: 'published',
        publishedAt: new Date(),
      },
      { new: true, runValidators: true },
    )
      .populate('categories', '_id name')
      .populate('author', 'username firstname lastname');

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    return blog;
  }

  static async unpublishBlog(id: string): Promise<BlogDocument> {
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      {
        status: 'cancelled',
        publishedAt: null,
      },
      { new: true, runValidators: true },
    )
      .populate('categories', '_id name')
      .populate('author', 'username firstname lastname');

    if (!blog) {
      throw new ApiError(404, 'Blog not found');
    }

    return blog;
  }
}
