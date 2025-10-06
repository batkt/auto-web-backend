import { BrandModel } from './brands.model';
import { ProductModel } from '../products/product.model';
import { BrandDocument, BrandData } from '../../types/brands';
import { ApiError } from '../../utils/api-error';

export class BrandService {
  static async createBrand(brandData: BrandData): Promise<BrandDocument> {
    const brand = new BrandModel(brandData);
    return await brand.save();
  }

  static async getBrandById(id: string): Promise<BrandDocument> {
    const brand = await BrandModel.findById(id);

    if (!brand) {
      throw new ApiError(404, 'Brand not found');
    }

    return brand;
  }

  static async getBrandList(): Promise<BrandDocument[]> {
    return await BrandModel.find().sort({ name: 1 });
  }

  static async updateBrand(id: string, updateData: Partial<BrandData>): Promise<BrandDocument> {
    const brand = await BrandModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!brand) {
      throw new ApiError(404, 'Brand not found');
    }

    return brand;
  }

  static async deleteBrand(id: string): Promise<void> {
    // Check if brand is being used by any products
    const productsUsingBrand = await ProductModel.findOne({ brand: id });
    if (productsUsingBrand) {
      throw new ApiError(400, 'Cannot delete brand that is being used by products');
    }

    const brand = await BrandModel.findByIdAndDelete(id);

    if (!brand) {
      throw new ApiError(404, 'Brand not found');
    }
  }
}
