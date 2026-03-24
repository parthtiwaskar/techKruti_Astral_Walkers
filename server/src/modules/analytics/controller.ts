// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Request, Response } from 'express';
import { AnalyticsService } from './service';
import { ApiResponse } from '../../shared/contracts/api';
import { DashboardSummary } from './types';
import { AuthRequest } from '../../middleware/verifyToken';

export class AnalyticsController {
    // Mock layer
    static getSummary(req: Request<{ studentId: string }>, res: Response) {
        const studentId = req.params.studentId;
        const summary = AnalyticsService.getSummary(studentId);
        const response: ApiResponse<DashboardSummary> = { success: true, data: summary };
        res.json(response);
    }

    // Opportunity layer
    static async getDashboardStatsSQL(req: AuthRequest, res: Response) {
        const firebaseUid = req.user?.uid;
        if (!firebaseUid) return res.status(401).json({ success: false, error: 'Unauthorized' });
        
        try {
            const stats = await AnalyticsService.getDashboardStats(firebaseUid);
            res.json({ success: true, data: stats } as ApiResponse);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}
