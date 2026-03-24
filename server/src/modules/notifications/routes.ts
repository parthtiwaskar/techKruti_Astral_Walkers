import { Router } from 'express';
import { notificationController } from './controller';

const router = Router();

router.get('/:studentId', notificationController.getStudentNotifications);

export { router as notificationRoutes };
