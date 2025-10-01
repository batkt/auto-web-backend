import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/response';
import { SurveyService } from './survey.service';
import { SurveyStatus } from './survey.model';

export class SurveyController {
  private surveyService: SurveyService;

  constructor() {
    this.surveyService = new SurveyService();
  }

  createSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const survey = await this.surveyService.createSurvey(req.body);
      sendSuccess(res, survey, 201);
    } catch (error) {
      next(error);
    }
  };

  getSurveys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.surveyService.getSurveys(req.query);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getSurveyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const survey = await this.surveyService.getSurveyById(req.params.id);
      if (survey) {
        sendSuccess(res, survey);
      } else {
        res.status(404).json({ message: 'Survey not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  getActiveSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const survey = await this.surveyService.getActiveSurvey(req.params.id);
      if (survey) {
        sendSuccess(res, survey);
      } else {
        res.status(404).json({ message: 'Survey not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  updateSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const survey = await this.surveyService.updateSurvey(req.params.id, req.body);
      if (survey) {
        sendSuccess(res, survey);
      } else {
        res.status(404).json({ message: 'Survey not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  deleteSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const survey = await this.surveyService.deleteSurvey(req.params.id);
      if (survey) {
        sendSuccess(res, { message: 'Survey deleted successfully' });
      } else {
        res.status(404).json({ message: 'Survey not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  getSurveyResponses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.surveyService.getSurveyResponses(req.params.id, req.query);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  submitSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ipAddress = req.headers['x-forwarded-for'] || req.ip || '';
      const result = await this.surveyService.submitSurvey(req.body, ipAddress as string);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  startSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.surveyService.startSurvey(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  stopSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.surveyService.stopSurvey(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getSurveyVersions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.surveyService.getSurveyVersions(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  duplicateSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.surveyService.duplicateSurvey(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
}
