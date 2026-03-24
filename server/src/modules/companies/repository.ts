import { Company } from '../../shared/contracts/types';

export class CompanyRepository {
  private companies: Company[] = [];

  public getAll(): Company[] {
    return this.companies;
  }

  public getById(id: string): Company | undefined {
    return this.companies.find(c => c.id === id);
  }

  public create(company: Company): Company {
    this.companies.push(company);
    return company;
  }
}

export const companyRepository = new CompanyRepository();
