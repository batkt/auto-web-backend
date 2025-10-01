import { Router } from 'express';
import { PageController } from './page.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', PageController.getPageList);
router.get('/detail/:slug', PageController.getPageBySlug);
router.get('/sections/:pageKey', PageController.getPageSections);
router.put('/:id', authenticate, PageController.updatePage);

export default router;
