// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Router } from 'express';
import { companyController } from './controller';

const router = Router();

router.get('/', companyController.getCompanies);
router.post('/', companyController.createCompany);
router.get('/:id', companyController.getCompanyById);

export { router as companyRoutes };
