import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.post('/:userId/update', userController.updateUser);
router.post('/:userId/delete', userController.deleteUser);
router.post('/:userId/reset-password', userController.resetPasswordUser);
router.post('/me', userController.getProfile);

export { router as userRouter };
