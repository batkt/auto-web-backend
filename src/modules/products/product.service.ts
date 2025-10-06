import { ProductModel } from './product.model';
import { ApiError } from '../../utils/api-error';
import { ProductDocument, ProductData } from '../../types/product';

export class ProductService {
  static async createProduct(productData: ProductData): Promise<ProductDocument> {
    const product = new ProductModel(productData);
    return await product.save();
  }

  static async getProductById(id: string): Promise<ProductDocument> {
    const product = await ProductModel.findById(id);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }

  static async getProductByProModel(proModel: string): Promise<ProductDocument> {
    const product = await ProductModel.findOne({ proModel });
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }

  static async getProductList(query: any = {}): Promise<{
    data: ProductDocument[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const {
      status,
      language,
      search,
      minPrice,
      maxPrice,
      inStock,
      size,
      page = 1,
      limit = 10,
      sort = '-createdAt',
    } = query;

    const filter: any = {};

    if (status) filter.status = status;
    if (language) filter.language = language;

    if (search) {
      const rx = { $regex: String(search), $options: 'i' };
      filter.$or = [{ name: rx }, { proModel: rx }, { desc: rx }];
    }

    if (size) filter.size = String(size);

    if (inStock !== undefined && inStock !== 'all') {
      filter.stock = String(inStock) === 'true';
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [data, total] = await Promise.all([
      ProductModel.find(filter).sort(String(sort)).skip(skip).limit(limitNum).lean().exec(),
      ProductModel.countDocuments(filter),
    ]);

    return {
      data: data as any,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    };
  }

  static async updateProduct(id: string, updateData: Partial<ProductDocument>): Promise<ProductDocument> {
    const payload: any = { ...updateData };

    if ('qty' in updateData && !('stock' in updateData)) {
      payload.stock = Number(updateData.qty ?? 0) > 0;
    }

    const product = await ProductModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }

  static async deleteProduct(id: string): Promise<void> {
    const deleted = await ProductModel.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, 'Product not found');
  }

  static async publishProduct(id: string): Promise<ProductDocument> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { status: 'published', publishedAt: new Date() },
      { new: true, runValidators: true },
    );
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }
  static async unpublishProduct(id: string): Promise<ProductDocument> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { status: 'cancelled', publishedAt: null },
      { new: true, runValidators: true },
    );
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }
}
