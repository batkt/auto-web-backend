import { Router } from 'express';
import { ContactController } from './contact.controller';

const router = Router();
const contactController = new ContactController();

router.get('/messages', contactController.getMessagesList);
router.get('/messages/:id', contactController.getDetailMessage);
router.post('/messages', contactController.saveMessage);
router.post('/messages/seen', contactController.setMessageStatusSeen);

export { router as contactRouter };
