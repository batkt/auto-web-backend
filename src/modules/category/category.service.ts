import { CategoryModel } from './category.model';
import { BlogModel } from '../blog/blog.model';
import { CategoryDocument, CategoryData } from '../../types/category';
import { ApiError } from '../../utils/api-error';

export class CategoryService {
  static async createCategory(categoryData: CategoryData): Promise<CategoryDocument> {
    const category = new CategoryModel(categoryData);
    return await category.save();
  }

  static async getCategoryById(id: string): Promise<CategoryDocument> {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return category;
  }

  static async getCategoryList(): Promise<CategoryDocument[]> {
    return await CategoryModel.find().sort({ name: 1 });
  }

  static async updateCategory(id: string, updateData: Partial<CategoryData>): Promise<CategoryDocument> {
    const category = await CategoryModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return category;
  }

  static async deleteCategory(id: string): Promise<void> {
    // Check if category is being used by any blogs
    const blogsUsingCategory = await BlogModel.findOne({ categories: id });
    if (blogsUsingCategory) {
      throw new ApiError(400, 'Cannot delete category that is being used by blogs');
    }

    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
  }
}
