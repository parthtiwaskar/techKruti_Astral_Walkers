import { Router } from 'express';
import { applicationController } from './controller';

const router = Router();

router.post('/', applicationController.applyJob);
router.get('/:studentId', applicationController.getApplications);
router.patch('/:applicationId/status', applicationController.updateStatus);
router.get('/dashboard/:studentId', applicationController.getDashboard);

export { router as applicationRoutes };
