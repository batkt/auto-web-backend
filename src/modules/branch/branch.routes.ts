import { Router } from 'express';
import { BranchController } from './branch.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// Create a new branch
router.post('/', authenticate, BranchController.createBranch);

// Get all branches
router.get('/', BranchController.getAllBranches);

// Get branch by ID
router.get('/:id', BranchController.getBranchById);

// Update branch
router.put('/:id', authenticate, BranchController.updateBranch);

// Delete branch
router.delete('/:id', authenticate, BranchController.deleteBranch);

export default router;
