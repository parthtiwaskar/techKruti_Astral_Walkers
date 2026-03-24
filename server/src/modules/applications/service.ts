import { Application } from '../../shared/contracts/types';
import { ApplicationRepository, applicationRepository } from './repository';
import { ApplyJobRequest, UpdateApplicationStatusRequest } from './types';
import { generateId } from './utils';
import { notificationService } from '../notifications/service';
import { jobService } from '../jobs/service';

export class ApplicationService {
  constructor(private repo: ApplicationRepository) {}

  public applyToJob(request: ApplyJobRequest): Application {
    const existing = this.repo.getByStudentAndJob(request.studentId, request.jobId);
    if (existing) {
      throw new Error('Duplicate application');
    }

    const job = jobService.getJobById(request.jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    const now = new Date().toISOString();
    const newApplication: Application = {
      id: generateId(),
      studentId: request.studentId,
      jobId: request.jobId,
      status: "applied",
      appliedAt: now,
      updatedAt: now,
      statusHistory: [{ status: "applied", timestamp: now }]
    };

    const saved = this.repo.create(newApplication);

    notificationService.triggerEvent({
      studentId: request.studentId,
      message: `You have successfully applied to ${job.title || 'the job'}.`,
      type: 'APPLICATION_SUBMITTED'
    });

    return saved;
  }

  public getStudentApplications(studentId: string): Application[] {
    return this.repo.getAllForStudent(studentId);
  }

  public updateStatus(id: string, status: "applied" | "shortlisted" | "interview" | "rejected" | "offered"): Application {
    const application = this.repo.getById(id);
    if (!application) {
      throw new Error('Application not found');
    }

    const now = new Date().toISOString();
    const history = application.statusHistory || [];
    history.push({ status, timestamp: now });

    const updated = this.repo.update(id, {
      status,
      updatedAt: now,
      statusHistory: history
    });

    if (updated) {
      const job = jobService.getJobById(updated.jobId);
      notificationService.triggerEvent({
        studentId: updated.studentId,
        message: `Your application status for ${job?.title || 'a job'} has been updated to ${status}.`,
        type: 'STATUS_UPDATED'
      });
    }

    return updated!;
  }

  public getOpportunityDashboard(studentId: string): { availableJobs: any[], appliedJobs: any[] } {
    const allJobs = jobService.getJobs();
    const applications = this.repo.getAllForStudent(studentId);

    const appliedJobIds = new Set(applications.map(a => a.jobId));
    
    const availableJobs = allJobs.filter(j => !appliedJobIds.has(j.id));
    
    const appliedJobs = applications.map(app => {
      const job = jobService.getJobById(app.jobId);
      return {
        applicationId: app.id,
        status: app.status,
        appliedAt: app.appliedAt,
        job
      };
    });

    return { availableJobs, appliedJobs };
  }
}

export const applicationService = new ApplicationService(applicationRepository);
