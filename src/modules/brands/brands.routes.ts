import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { BrandController } from './brands.controller';

const router = Router();

// Brand routes
router.post('/brands', authenticate, BrandController.createBrand);
router.get('/brands', BrandController.getBrandList);
router.get('/brands/:id', BrandController.getBrandById);

router.put('/brands/:id', authenticate, BrandController.updateBrand);
router.delete('/brands/:id', authenticate, BrandController.deleteBrand);

export default router;
