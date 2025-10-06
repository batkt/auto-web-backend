import { Router } from 'express';
import { ProductController } from './product.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, ProductController.createProduct);
router.get('/', ProductController.getProductList);
router.get('/by-model/:proModel', ProductController.getProductByProModel);
router.get('/:id', ProductController.getProductById);
router.put('/:id', authenticate, ProductController.updateProduct);
router.delete('/:id', authenticate, ProductController.deleteProduct);

// publish/unpublish
router.patch('/:id/publish', ProductController.publishProduct);
router.patch('/:id/unpublish', ProductController.unpublishProduct);

export default router;
