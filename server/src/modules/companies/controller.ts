import { Request, Response } from 'express';
import { companyService } from './service';
import { ApiResponse } from '../../shared/contracts/api';

export class CompanyController {
  public getCompanies = (req: Request, res: Response) => {
    try {
      const companies = companyService.getCompanies();
      const response: ApiResponse = { success: true, data: companies };
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public getCompanyById = (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const company = companyService.getCompanyById(id);
      if (!company) {
         return res.status(404).json({ success: false, error: 'Company not found' });
      }
      res.json({ success: true, data: company });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public createCompany = (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body.name || !body.domain || !body.location || !body.description) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }
      const newCompany = companyService.createCompany(body);
      res.status(201).json({ success: true, data: newCompany });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const companyController = new CompanyController();
