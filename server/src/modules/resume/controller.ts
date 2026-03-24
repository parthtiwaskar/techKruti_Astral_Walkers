import { Request, Response } from 'express';
import { ResumeService } from './service';
import { ApiResponse } from '../../shared/contracts/api';
import { ResumeAnalysisResult } from './types';

export class ResumeController {
    static getAnalysis(req: Request, res: Response) {
        const studentId = req.params.studentId as string;
        const analysis = ResumeService.getAnalysis(studentId);
        
        const response: ApiResponse<ResumeAnalysisResult> = { success: true, data: analysis };
        res.json(response);
    }
}
