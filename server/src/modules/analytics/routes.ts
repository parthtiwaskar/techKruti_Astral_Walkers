// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Router } from 'express';
import { AnalyticsController } from './controller';
import { verifyToken } from '../../middleware/verifyToken';

const router = Router();

// Student routes (mock)
router.get('/:studentId/summary', AnalyticsController.getSummary);

// Opportunity routes (DB)
router.get('/', verifyToken, AnalyticsController.getDashboardStatsSQL);

export default router;
