// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Company } from '../../shared/contracts/types';
import { CompanyRepository, companyRepository } from './repository';
import { CreateCompanyRequest } from './types';
import { generateId } from './utils';

export class CompanyService {
  constructor(private repo: CompanyRepository) {}

  public async getCompanies(filters: any): Promise<any[]> {
    return this.repo.getAll(filters);
  }

  public async getCompanyById(id: string): Promise<any | undefined> {
    return this.repo.getById(id);
  }

  public async createCompany(request: CreateCompanyRequest): Promise<Company> {
    const newCompany: Company = {
      id: generateId(),
      name: request.name,
      description: request.description,
      location: request.location,
      domain: request.domain
    };
    return this.repo.create(newCompany);
  }
}

export const companyService = new CompanyService(companyRepository);
