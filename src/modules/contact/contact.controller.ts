import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response';
import { ContactService } from './contact.service';

export class ContactController {
  private contactService: ContactService;
  constructor() {
    this.contactService = new ContactService();
  }

  getMessagesList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const search = req.query.search ? String(req.query.search) : '';
      const result = await this.contactService.getMessagesList(page, limit, search);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  getDetailMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.getDetailMessage(req.params.id);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  saveMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('req.body', req.body);
      const result = await this.contactService.saveMessage(req.body);
      sendSuccess(res, result, 201);
    } catch (err) {
      next(err);
    }
  };

  setMessageStatusSeen = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.setMessageStatusSeen(req.body.id);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };
}
