import { Request, Response } from 'express';
import { AnalyticsService } from './service';
import { ApiResponse } from '../../shared/contracts/api';
import { DashboardSummary } from './types';

export class AnalyticsController {
    static getSummary(req: Request, res: Response) {
        const studentId = req.params.studentId as string;
        const summary = AnalyticsService.getSummary(studentId);
        
        const response: ApiResponse<DashboardSummary> = { success: true, data: summary };
        res.json(response);
    }
}
