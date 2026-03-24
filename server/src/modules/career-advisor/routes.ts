import { Router } from 'express';
import { CareerAdvisorController } from './controller';

const router = Router();

router.post('/chat', CareerAdvisorController.chat);

export default router;
