// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Request, Response } from 'express';
import { companyService } from './service';
import { ApiResponse } from '../../shared/contracts/api';

export class CompanyController {
  public getCompanies = async (req: Request, res: Response) => {
    try {
      const filters = req.query;
      const companies = await companyService.getCompanies(filters);
      const response: ApiResponse = { success: true, data: companies };
      res.json(response);
    } catch (error: any) {
      console.error('Error fetching companies:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };

  public getCompanyById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const company = await companyService.getCompanyById(id);
      if (!company) {
         return res.status(404).json({ success: false, error: 'Company not found' });
      }
      res.json({ success: true, data: company });
    } catch (error: any) {
      console.error('Error fetching company:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };

  public createCompany = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body.name || !body.domain || !body.location || !body.description) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }
      const newCompany = await companyService.createCompany(body);
      res.status(201).json({ success: true, data: newCompany });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const companyController = new CompanyController();
