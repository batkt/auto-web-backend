import { Router } from 'express';
import { CategoryController } from './category.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// Category routes
router.post('/categories', authenticate, CategoryController.createCategory);
router.get('/categories', CategoryController.getCategoryList);
router.get('/categories/:id', CategoryController.getCategoryById);

router.put('/categories/:id', authenticate, CategoryController.updateCategory);
router.delete('/categories/:id', authenticate, CategoryController.deleteCategory);

export default router;
