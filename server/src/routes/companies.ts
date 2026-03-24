import { Router } from 'express';
import { getCompanies, getCompanyById } from '@/controllers/companiesController';
import { verifyToken } from '@/middleware/verifyToken';

const router = Router();

// Protected routes (require valid firebase token)
router.get('/', verifyToken, getCompanies);
router.get('/:id', verifyToken, getCompanyById);

export default router;
