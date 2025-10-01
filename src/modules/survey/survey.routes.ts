import { Router } from 'express';
import { SurveyController } from './survey.controller';

const router = Router();
const surveyController = new SurveyController();

router.post('/surveys', surveyController.createSurvey);
router.get('/surveys', surveyController.getSurveys);
router.get('/surveys/:id', surveyController.getSurveyById);
router.get('/surveys/:id/active', surveyController.getActiveSurvey);
router.post('/surveys/:id/start', surveyController.startSurvey);
router.post('/surveys/:id/stop', surveyController.stopSurvey);
router.put('/surveys/:id', surveyController.updateSurvey);
router.delete('/surveys/:id', surveyController.deleteSurvey);
router.get('/surveys/:id/responses', surveyController.getSurveyResponses);
router.get('/surveys/:id/versions', surveyController.getSurveyVersions);
router.post('/survey/submit', surveyController.submitSurvey);
router.post('/surveys/:id/duplicate', surveyController.duplicateSurvey);

export default router;
