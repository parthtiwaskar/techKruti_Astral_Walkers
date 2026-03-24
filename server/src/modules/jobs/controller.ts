import { Request, Response } from 'express';
import { jobService } from './service';
import { ApiResponse } from '../../shared/contracts/api';
import { JobFilterQuery } from './types';

export class JobController {
  public getJobs = (req: Request, res: Response) => {
    try {
      const filters: JobFilterQuery = {
        cgpa: req.query.cgpa ? parseFloat(req.query.cgpa as string) : undefined,
        location: req.query.location as string,
        mode: req.query.mode as string,
        shift: req.query.shift as string,
        skills: req.query.skills ? (req.query.skills as string).split(',') : undefined,
      };

      const jobs = jobService.getJobs(filters);
      res.json({ success: true, data: jobs } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public getJobById = (req: Request<{ id: string }>, res: Response) => {
    try {
      const job = jobService.getJobById(req.params.id);
      if (!job) {
        return res.status(404).json({ success: false, error: 'Job not found' });
      }
      res.json({ success: true, data: job } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public createJob = (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body.title || !body.companyId || typeof body.minCgpa !== 'number') {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }
      const newJob = jobService.createJob(body);
      res.status(201).json({ success: true, data: newJob } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public updateJob = (req: Request<{ id: string }>, res: Response) => {
    try {
      const updated = jobService.updateJob(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Job not found' });
      }
      res.json({ success: true, data: updated } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  public deleteJob = (req: Request<{ id: string }>, res: Response) => {
    try {
      const deleted = jobService.deleteJob(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Job not found' });
      }
      res.json({ success: true, data: { deleted: true } } as ApiResponse);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const jobController = new JobController();
