import { Router } from 'express';
import { ProfileController } from './controller';

const router = Router();

router.get('/:studentId', ProfileController.getProfile);
router.post('/', ProfileController.createProfile);
router.put('/:studentId', ProfileController.updateProfile);
router.get('/:studentId/completeness', ProfileController.getCompleteness);

export default router;
