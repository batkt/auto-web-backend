import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { SectionService } from './section.service';
import { FieldDefinition } from '../../types/page';
import { ApiError } from '../../utils/api-error';
import { sendSuccess } from '../../utils/response';

const createSectionSchema = z.object({
    pageId: z.string().min(1),
    data: z.record(z.any()),
    fieldDefinitions: z.array(z.object({
        name: z.string(),
        type: z.enum(['string', 'number', 'boolean', 'image', 'array', 'object']),
        required: z.boolean().optional(),
        sortOrder: z.number().optional()
    }))
});

const updateSectionSchema = z.object({
    data: z.record(z.any()),
    fieldDefinitions: z.array(z.object({
        name: z.string(),
        type: z.enum(['string', 'number', 'boolean', 'image', 'array', 'object']),
        required: z.boolean().optional(),
        sortOrder: z.number().optional()
    })).optional()
});

export class SectionController {
    static async createSection(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedData = createSectionSchema.parse(req.body);

            const section = await SectionService.createSection(
                validatedData.pageId,
                validatedData.data,
                validatedData.fieldDefinitions as FieldDefinition[]
            );

            sendSuccess(res, section, 201);
        } catch (error) {
            next(error);
        }
    }

    static async getSectionByKey(req: Request, res: Response, next: NextFunction) {
        try {
            const { key } = req.params;
            const section = await SectionService.getSectionByKey(key);
            sendSuccess(res, section);
        } catch (error) {
            next(error);
        }
    }

    static async updateSection(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            // const validatedData = updateSectionSchema.parse(req.body);

            const section = await SectionService.updateSection(
                id,
                req.body
            );

            sendSuccess(res, section);
        } catch (error) {
            next(error);
        }
    }
} 