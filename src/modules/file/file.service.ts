import { FileModel, IFile } from './file.model';
import { ApiError } from '../../utils/api-error';
import { Types } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

interface GetFilesOptions {
  page: number;
  limit: number;
  isActive?: boolean;
}

export class FileService {
  static async uploadFile(file: Express.Multer.File, uploadedBy?: string): Promise<IFile> {
    try {
      // File is already saved to disk by multer
      // Create file record in database
      const fileRecord = await FileModel.create({
        originalName: file.originalname,
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        metadata: {
          mimetype: file.mimetype,
          size: file.size,
        },
        isActive: true,
        uploadedBy: uploadedBy ? new Types.ObjectId(uploadedBy) : undefined,
      });

      return fileRecord;
    } catch (error) {
      throw new ApiError(500, 'Failed to upload file');
    }
  }

  static async getFiles(options: GetFilesOptions) {
    const { page, limit, isActive } = options;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    const files = await FileModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploadedBy', 'name email');

    const total = await FileModel.countDocuments(filter);

    return {
      files,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getFileById(id: string): Promise<IFile> {
    const file = await FileModel.findById(id).populate('uploadedBy', 'name email');
    if (!file) {
      throw new ApiError(404, 'File not found');
    }
    return file;
  }

  static async deleteFile(id: string): Promise<void> {
    const file = await FileModel.findById(id);
    if (!file) {
      throw new ApiError(404, 'File not found');
    }

    // Delete physical file from upload directory
    const filePath = path.join(process.cwd(), 'upload', file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await FileModel.findByIdAndDelete(id);
  }

  static async updateFileStatus(id: string, isActive: boolean): Promise<IFile> {
    const file = await FileModel.findByIdAndUpdate(id, { isActive }, { new: true, runValidators: true }).populate(
      'uploadedBy',
      'name email',
    );

    if (!file) {
      throw new ApiError(404, 'File not found');
    }

    return file;
  }

  static async getFileStream(filename: string) {
    const filePath = path.join(__dirname, '../../../uploads', filename);

    if (!fs.existsSync(filePath)) {
      throw new ApiError(404, 'File not found');
    }

    return fs.createReadStream(filePath);
  }
}
