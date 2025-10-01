import { Request, Response, NextFunction } from 'express';
import { BranchService } from './branch.service';
import { sendSuccess } from '../../utils/response';
import { ApiError } from '../../utils/api-error';

export class BranchController {
  static async createBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, fullAddress, phone, email, services, image, coordinates, pastor, description } = req.body;

      // Validate required fields
      if (!name || !fullAddress || !phone || !email || !image || !coordinates) {
        throw new ApiError(400, 'Required fields are missing');
      }

      // Validate coordinates
      if (!Array.isArray(coordinates) || coordinates.length !== 2) {
        throw new ApiError(400, 'Coordinates must be an array of 2 numbers: [latitude, longitude]');
      }

      const branchData = {
        name,
        fullAddress,
        phone,
        email,
        services: services || [],
        image,
        coordinates: coordinates as [number, number],
        pastor,
        description,
      };

      const branch = await BranchService.createBranch(branchData);
      sendSuccess(res, branch, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBranches(req: Request, res: Response, next: NextFunction) {
    try {
      const branches = await BranchService.getAllBranches();
      sendSuccess(res, branches);
    } catch (error) {
      next(error);
    }
  }

  static async getBranchById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const branch = await BranchService.getBranchById(id);
      sendSuccess(res, branch);
    } catch (error) {
      next(error);
    }
  }

  static async updateBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate coordinates if provided
      if (updateData.coordinates && (!Array.isArray(updateData.coordinates) || updateData.coordinates.length !== 2)) {
        throw new ApiError(400, 'Coordinates must be an array of 2 numbers: [latitude, longitude]');
      }

      const updatedBranch = await BranchService.updateBranch(id, updateData);
      sendSuccess(res, updatedBranch);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await BranchService.deleteBranch(id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}
