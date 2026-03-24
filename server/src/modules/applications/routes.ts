// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Router } from 'express';
import { applicationController } from './controller';
import { verifyToken } from '../../middleware/verifyToken';

const router = Router();

// --- Opportunity Branch (SQL + Auth) ---
router.get('/', verifyToken, applicationController.getApplicationsSQL);
router.post('/', verifyToken, applicationController.applyToCompanySQL);

// --- Student Branch (Mock, Explicit IDs) ---
router.post('/apply', applicationController.applyJobMock);
router.get('/student/:studentId', applicationController.getStudentApplicationsMock);
router.patch('/:applicationId/status', applicationController.updateStatusMock);
router.get('/student/:studentId/dashboard', applicationController.getDashboardMock);

export { router as applicationRoutes };
