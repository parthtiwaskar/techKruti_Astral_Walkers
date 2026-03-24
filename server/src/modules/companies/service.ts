import { Company } from '../../shared/contracts/types';
import { CompanyRepository, companyRepository } from './repository';
import { CreateCompanyRequest } from './types';
import { generateId } from './utils';

export class CompanyService {
  constructor(private repo: CompanyRepository) {}

  public getCompanies(): Company[] {
    return this.repo.getAll();
  }

  public getCompanyById(id: string): Company | undefined {
    return this.repo.getById(id);
  }

  public createCompany(request: CreateCompanyRequest): Company {
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
