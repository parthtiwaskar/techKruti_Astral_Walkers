// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Application } from '../../shared/contracts/types';
import { ApplicationRepository, applicationRepository } from './repository';
import { ApplyJobRequest } from './types';
import { generateId } from './utils';

export class ApplicationService {
  constructor(private repo: ApplicationRepository) {}

  public applyToJobMock(request: ApplyJobRequest): Application {
    const existing = this.repo.getByStudentAndJobMock(request.studentId, request.jobId);
    if (existing) throw new Error('Duplicate application');

    const now = new Date().toISOString();
    const newApplication: Application = {
      id: generateId(), studentId: request.studentId, jobId: request.jobId,
      status: "applied", appliedAt: now, updatedAt: now,
      statusHistory: [{ status: "applied", timestamp: now }]
    };
    return this.repo.createMock(newApplication);
  }

  public getStudentApplicationsMock(studentId: string): Application[] {
    return this.repo.getAllForStudentMock(studentId);
  }

  public updateStatusMock(id: string, status: "applied" | "shortlisted" | "interview" | "rejected" | "offered"): Application {
    const application = this.repo.getByIdMock(id);
    if (!application) throw new Error('Application not found');
    const now = new Date().toISOString();
    const history = application.statusHistory || [];
    history.push({ status, timestamp: now });
    const updated = this.repo.updateMock(id, { status, updatedAt: now, statusHistory: history });
    return updated!;
  }

  public getOpportunityDashboardMock(studentId: string): { availableJobs: any[], appliedJobs: any[] } {
    // Decoupled from jobService: safe mock fallback
    const mockAvailableJobs = [{ id: 'mock-job-1', title: 'Software Engineer', company: 'TechCorp' }];
    const applications = this.repo.getAllForStudentMock(studentId);
    
    const appliedJobs = applications.map(app => ({
      applicationId: app.id, status: app.status, appliedAt: app.appliedAt,
      job: { id: app.jobId, title: 'Applied Job Mock' }
    }));
    return { availableJobs: mockAvailableJobs, appliedJobs };
  }

  public async getApplicationsByFirebaseUid(firebaseUid: string) {
    return this.repo.getApplicationsByFirebaseUid(firebaseUid);
  }

  public async applyToCompanySQL(firebaseUid: string, companyId: string) {
    const userId = await this.repo.getUserIdByFirebaseUid(firebaseUid);
    if (!userId) throw new Error('User not found in database');
    const alreadyApplied = await this.repo.checkCompanyApplication(userId, companyId);
    if (alreadyApplied) throw new Error('Already applied to this company');
    return this.repo.applyToCompanySQL(userId, companyId);
  }
}
export const applicationService = new ApplicationService(applicationRepository);
