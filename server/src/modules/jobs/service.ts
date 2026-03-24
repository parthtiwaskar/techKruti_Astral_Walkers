import { Job } from '../../shared/contracts/types';
import { JobRepository, jobRepository } from './repository';
import { CreateJobRequest, UpdateJobRequest, JobFilterQuery } from './types';
import { generateId } from './utils';

export class JobService {
  constructor(private repo: JobRepository) {}

  public getJobs(filters?: JobFilterQuery): Job[] {
    let jobs = this.repo.getAll();

    if (filters) {
      if (filters.cgpa !== undefined) {
        jobs = jobs.filter(j => j.minCgpa <= (filters.cgpa as number));
      }
      if (filters.location) {
        jobs = jobs.filter(j => j.location.toLowerCase() === filters.location?.toLowerCase());
      }
      if (filters.mode) {
        jobs = jobs.filter(j => j.mode.toLowerCase() === filters.mode?.toLowerCase());
      }
      if (filters.shift) {
        jobs = jobs.filter(j => j.shift.toLowerCase() === filters.shift?.toLowerCase());
      }
      if (filters.skills && filters.skills.length > 0) {
        jobs = jobs.filter(j => {
          const jobSkills = [...j.requiredSkills, ...j.preferredSkills].map(s => s.toLowerCase());
          return filters.skills!.some(s => jobSkills.includes(s.toLowerCase()));
        });
      }
    }

    return jobs;
  }

  public getJobById(id: string): Job | undefined {
    return this.repo.getById(id);
  }

  public createJob(request: CreateJobRequest): Job {
    const newJob: Job = {
      id: generateId(),
      ...request
    };
    return this.repo.create(newJob);
  }

  public updateJob(id: string, request: UpdateJobRequest): Job | undefined {
    return this.repo.update(id, request);
  }

  public deleteJob(id: string): boolean {
    return this.repo.delete(id);
  }
}

export const jobService = new JobService(jobRepository);
