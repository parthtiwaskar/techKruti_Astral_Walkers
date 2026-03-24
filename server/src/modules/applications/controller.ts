// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Request, Response } from 'express';
import { applicationService } from './service';
import { ApiResponse } from '../../shared/contracts/api';
import { AuthRequest } from '../../middleware/verifyToken';

export class ApplicationController {
  // --- MOCK LAYER (Student Branch) ---
  public applyJobMock = (req: Request, res: Response) => {
    try {
      const { studentId, jobId } = req.body;
      if (!studentId || !jobId) return res.status(400).json({ success: false, error: 'studentId and jobId are required' });
      const application = applicationService.applyToJobMock({ studentId, jobId });
      res.status(201).json({ success: true, data: application } as ApiResponse);
    } catch (error: any) { res.status(500).json({ success: false, error: error.message }); }
  };
  public getStudentApplicationsMock = (req: Request<{ studentId: string }>, res: Response) => {
    try {
      const { studentId } = req.params;
      const applications = applicationService.getStudentApplicationsMock(studentId);
      res.json({ success: true, data: applications } as ApiResponse);
    } catch (error: any) { res.status(500).json({ success: false, error: error.message }); }
  };
  public updateStatusMock = (req: Request<{ applicationId: string }>, res: Response) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;
      const application = applicationService.updateStatusMock(applicationId, status as any);
      res.json({ success: true, data: application } as ApiResponse);
    } catch (error: any) { res.status(500).json({ success: false, error: error.message }); }
  };
  public getDashboardMock = (req: Request<{ studentId: string }>, res: Response) => {
    try {
      const { studentId } = req.params;
      const dashboard = applicationService.getOpportunityDashboardMock(studentId);
      res.json({ success: true, data: dashboard } as ApiResponse);
    } catch (error: any) { res.status(500).json({ success: false, error: error.message }); }
  };

  // --- SQL LAYER (Opportunity Branch) ---
  public getApplicationsSQL = async (req: AuthRequest, res: Response) => {
    const firebaseUid = req.user?.uid;
    if (!firebaseUid) return res.status(401).json({ success: false, error: 'Unauthorized' });
    try {
      const apps = await applicationService.getApplicationsByFirebaseUid(firebaseUid);
      res.json({ success: true, data: apps } as ApiResponse);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };
  public applyToCompanySQL = async (req: AuthRequest, res: Response) => {
    const firebaseUid = req.user?.uid;
    const { companyId } = req.body;
    if (!firebaseUid || !companyId) return res.status(400).json({ success: false, error: 'Missing information' });
    try {
      const newApp = await applicationService.applyToCompanySQL(firebaseUid, companyId);
      res.status(201).json({ success: true, data: newApp } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}
export const applicationController = new ApplicationController();
