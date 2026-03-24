import { Router } from 'express';
import { getApplications, applyToCompany } from '@/controllers/applicationsController';
import { verifyToken } from '@/middleware/verifyToken';

const router = Router();

router.get('/', verifyToken, getApplications);
router.post('/', verifyToken, applyToCompany);

export default router;
