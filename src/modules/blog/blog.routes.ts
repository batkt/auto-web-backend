import { Router } from 'express';
import { BlogController } from './blog.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// Blog routes
router.post('/blogs', authenticate, BlogController.createBlog);
router.get('/blogs', BlogController.getBlogList);
router.get('/blogs/:id', BlogController.getBlogById);
router.put('/blogs/:id', authenticate, BlogController.updateBlog);
router.delete('/blogs/:id', authenticate, BlogController.deleteBlog);
router.patch('/blogs/:id/publish', authenticate, BlogController.publishBlog);
router.patch('/blogs/:id/unpublish', authenticate, BlogController.unpublishBlog);

export default router;
