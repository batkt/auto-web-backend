import { Router } from 'express';
import { SectionController } from './section.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', SectionController.createSection);
router.get('/:key', SectionController.getSectionByKey);
router.put('/:id', authenticate, SectionController.updateSection);

export default router;
