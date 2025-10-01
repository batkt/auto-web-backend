import { z } from 'zod';
import { SectionModel } from './section.model';
import { PageModel } from '../page/page.model';
import { FieldDefinition } from '../../types/page';
import { ApiError } from '../../utils/api-error';

export class SectionService {
  static async createSection(pageId: string, data: Record<string, any>, fieldDefinitions: FieldDefinition[]) {
    // Validate page exists
    const page = await PageModel.findById(pageId);
    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    // Create Zod schema from field definitions
    const schemaObject: Record<string, any> = {};

    fieldDefinitions.forEach((field) => {
      let fieldSchema: z.ZodTypeAny;

      switch (field.type) {
        case 'string':
          fieldSchema = z.string();
          break;
        case 'number':
          fieldSchema = z.number();
          break;
        case 'boolean':
          fieldSchema = z.boolean();
          break;
        case 'image':
          fieldSchema = z.string().url();
          break;
        case 'array':
          fieldSchema = z.array(z.any());
          break;
        case 'object':
          fieldSchema = z.record(z.any());
          break;
        default:
          fieldSchema = z.any();
      }

      if (field.required) {
        schemaObject[field.name] = fieldSchema;
      } else {
        schemaObject[field.name] = fieldSchema.optional();
      }
    });

    const dataSchema = z.object(schemaObject);

    // Validate data
    try {
      dataSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiError(400, `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
      }
      throw error;
    }

    // Get next sort order
    const lastSection = await SectionModel.findOne({ pageId }).sort({ sortOrder: -1 });
    const sortOrder = lastSection ? (lastSection.sortOrder || 0) + 1 : 0;

    // Create section
    const section = await SectionModel.create({
      pageId,
      data,
      sortOrder,
    });

    // Update page's sections array
    await PageModel.findByIdAndUpdate(pageId, {
      $push: { sections: section._id },
    });

    return section;
  }

  static async getSectionsByPageId(pageId: string) {
    return await SectionModel.find({ pageId }).sort({ sortOrder: 1 });
  }

  static async getSectionsByPageKey(pageKey: string) {
    return await SectionModel.find({ pageKey }).sort({ sortOrder: 1 });
  }

  static async getSectionByKey(key: string) {
    return await SectionModel.findOne({ key });
  }

  static async updateSection(id: string, data: any, fieldDefinitions?: FieldDefinition[]) {
    // Find the section by ID
    const section = await SectionModel.findById(id);
    if (!section) {
      throw new ApiError(404, 'Section not found');
    }

    // If field definitions are provided, validate the data
    if (fieldDefinitions && fieldDefinitions.length > 0) {
      // Create Zod schema from field definitions
      const schemaObject: Record<string, any> = {};

      fieldDefinitions.forEach((field) => {
        let fieldSchema: z.ZodTypeAny;

        switch (field.type) {
          case 'string':
            fieldSchema = z.string();
            break;
          case 'number':
            fieldSchema = z.number();
            break;
          case 'boolean':
            fieldSchema = z.boolean();
            break;
          case 'image':
            fieldSchema = z.string().url();
            break;
          case 'array':
            fieldSchema = z.array(z.any());
            break;
          case 'object':
            fieldSchema = z.record(z.any());
            break;
          default:
            fieldSchema = z.any();
        }

        if (field.required) {
          schemaObject[field.name] = fieldSchema;
        } else {
          schemaObject[field.name] = fieldSchema.optional();
        }
      });

      const dataSchema = z.object(schemaObject);

      // Validate data
      try {
        dataSchema.parse(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ApiError(400, `Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
        }
        throw error;
      }
    }

    // Update the section
    const updatedSection = await SectionModel.findByIdAndUpdate(id, { data }, { new: true, runValidators: true });

    return updatedSection;
  }
}
