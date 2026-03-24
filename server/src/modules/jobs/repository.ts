import { Job } from '../../shared/contracts/types';

export class JobRepository {
  private jobs: Job[] = [];

  public getAll(): Job[] {
    return this.jobs;
  }

  public getById(id: string): Job | undefined {
    return this.jobs.find(j => j.id === id);
  }

  public create(job: Job): Job {
    this.jobs.push(job);
    return job;
  }

  public update(id: string, updates: Partial<Job>): Job | undefined {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) return undefined;
    this.jobs[index] = { ...this.jobs[index], ...updates };
    return this.jobs[index];
  }

  public delete(id: string): boolean {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) return false;
    this.jobs.splice(index, 1);
    return true;
  }
}

export const jobRepository = new JobRepository();
