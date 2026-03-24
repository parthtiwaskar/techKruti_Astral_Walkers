import { Router } from 'express';
import { getDashboardStats } from '@/controllers/statsController';
import { verifyToken } from '@/middleware/verifyToken';

const router = Router();

router.get('/dashboard', verifyToken, getDashboardStats);

export default router;
