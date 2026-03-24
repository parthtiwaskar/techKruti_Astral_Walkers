import { Request, Response } from 'express';
import { applicationService } from './service';
import { ApiResponse } from '../../shared/contracts/api';

export class ApplicationController {
  public applyJob = (req: Request, res: Response) => {
    try {
      const { studentId, jobId } = req.body;
      if (!studentId || !jobId) {
        return res.status(400).json({ success: false, error: 'studentId and jobId are required' });
      }
      const application = applicationService.applyToJob({ studentId, jobId });
      res.status(201).json({ success: true, data: application } as ApiResponse);
    } catch (error: any) {
      if (error.message === 'Duplicate application') {
        return res.status(409).json({ success: false, error: error.message });
      }
      if (error.message === 'Job not found') {
        return res.status(404).json({ success: false, error: error.message });
      }
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public getApplications = (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const applications = applicationService.getStudentApplications(studentId as string);
      res.json({ success: true, data: applications } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public updateStatus = (req: Request, res: Response) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, error: 'status is required' });
      }
      const application = applicationService.updateStatus(applicationId as string, status as "applied" | "shortlisted" | "interview" | "rejected" | "offered");
      res.json({ success: true, data: application } as ApiResponse);
    } catch (error: any) {
      if (error.message === 'Application not found') {
         return res.status(404).json({ success: false, error: error.message });
      }
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public getDashboard = (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const dashboard = applicationService.getOpportunityDashboard(studentId as string);
      res.json({ success: true, data: dashboard } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const applicationController = new ApplicationController();
