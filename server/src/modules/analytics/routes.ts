import { Router } from 'express';
import { AnalyticsController } from './controller';

const router = Router();

router.get('/:studentId/summary', AnalyticsController.getSummary);

export default router;
