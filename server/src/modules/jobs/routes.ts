import { Router } from 'express';
import { jobController } from './controller';

const router = Router();

router.get('/', jobController.getJobs);
router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

export { router as jobRoutes };
