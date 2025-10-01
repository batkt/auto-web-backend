import { BranchModel, IBranch } from './branch.model';
import { ApiError } from '../../utils/api-error';

export class BranchService {
  static async createBranch(branchData: Partial<IBranch>) {
    try {
      const branch = new BranchModel(branchData);
      const savedBranch = await branch.save();
      return savedBranch;
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new ApiError(400, 'Validation error: ' + error.message);
      }
      throw error;
    }
  }

  static async getAllBranches() {
    try {
      const branches = await BranchModel.find({}).sort({ createdAt: -1 });
      return branches;
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch branches');
    }
  }

  static async getBranchById(id: string) {
    try {
      const branch = await BranchModel.findById(id);
      if (!branch) {
        throw new ApiError(404, 'Branch not found');
      }
      return branch;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch branch');
    }
  }

  static async updateBranch(id: string, updateData: Partial<IBranch>) {
    try {
      const branch = await BranchModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!branch) {
        throw new ApiError(404, 'Branch not found');
      }

      return branch;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new ApiError(400, 'Validation error: ' + error.message);
      }
      throw new ApiError(500, 'Failed to update branch');
    }
  }

  static async deleteBranch(id: string) {
    try {
      const branch = await BranchModel.findByIdAndDelete(id);
      if (!branch) {
        throw new ApiError(404, 'Branch not found');
      }
      return { message: 'Branch deleted successfully' };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to delete branch');
    }
  }
}
