import { Router } from 'express';
import { ResumeController } from './controller';

const router = Router();

router.get('/:studentId/analysis', ResumeController.getAnalysis);

export default router;
