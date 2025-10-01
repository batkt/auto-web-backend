import { PageModel } from './page.model';
import { SectionModel } from '../section/section.model';
import { ApiError } from '../../utils/api-error';

export class PageService {
  static async getPageBySlug(slug: string) {
    const page = await PageModel.findOne({ slug });

    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    return page;
  }

  static async getPageList() {
    const pages = await PageModel.find(
      {},
      {
        slug: 1,
        name: 1,
        description: 1,
        sections: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    ).populate({
      path: 'sections',
      select: 'key sortOrder',
      options: { sort: { sortOrder: 1 } },
    });

    return pages;
  }

  static async getPageSectionsByKey(pageKey: string) {
    const page = await PageModel.findOne({ slug: pageKey });
    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    const sections = await SectionModel.find({ pageId: page._id?.toString() })
      .sort({ sortOrder: 1 })
      .select('key sortOrder data createdAt updatedAt');

    return sections;
  }

  static async createPage(slug: string, name: { mn: string; en: string }, description: { mn: string; en: string }) {
    const existingPage = await PageModel.findOne({ slug });
    if (existingPage) {
      throw new ApiError(400, 'Page with this slug already exists');
    }

    return await PageModel.create({
      slug,
      name,
      description,
      sections: [],
    });
  }

  static async updatePage(
    id: string,
    updateData: {
      name?: { mn: string; en: string };
      description?: { mn: string; en: string };
      keywords?: string[];
    },
  ) {
    const page = await PageModel.findById(id);

    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    // Validate required fields if they are being updated
    if (updateData.name) {
      if (!updateData.name.en?.trim() || !updateData.name.mn?.trim()) {
        throw new ApiError(400, 'Page name is required in both languages');
      }
    }

    if (updateData.description) {
      if (!updateData.description.en?.trim() || !updateData.description.mn?.trim()) {
        throw new ApiError(400, 'Page description is required in both languages');
      }
    }

    const updatedPage = await PageModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

    return updatedPage;
  }
}
