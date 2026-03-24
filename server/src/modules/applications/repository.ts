import { Application } from '../../shared/contracts/types';

export class ApplicationRepository {
  private applications: Application[] = [];

  public getAll(): Application[] {
    return this.applications;
  }

  public getById(id: string): Application | undefined {
    return this.applications.find(a => a.id === id);
  }

  public getByStudentAndJob(studentId: string, jobId: string): Application | undefined {
    return this.applications.find(a => a.studentId === studentId && a.jobId === jobId);
  }

  public getAllForStudent(studentId: string): Application[] {
    return this.applications.filter(a => a.studentId === studentId);
  }

  public create(application: Application): Application {
    this.applications.push(application);
    return application;
  }

  public update(id: string, updates: Partial<Application>): Application | undefined {
    const index = this.applications.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    this.applications[index] = { ...this.applications[index], ...updates };
    return this.applications[index];
  }
}

export const applicationRepository = new ApplicationRepository();
