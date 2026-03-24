import { Request, Response } from 'express';
import { ProfileService } from './service';
import { ApiResponse } from '../../shared/contracts/api';
import { Student } from '../../shared/contracts/types';

export class ProfileController {
    static getProfile(req: Request<{ studentId: string }>, res: Response) {
        const student = ProfileService.getProfile(req.params.studentId);
        if (!student) {
            const response: ApiResponse = { success: false, error: "Profile not found" };
            return res.status(404).json(response);
        }
        const response: ApiResponse<Student> = { success: true, data: student };
        res.json(response);
    }

    static createProfile(req: Request, res: Response) {
        try {
            const student = ProfileService.createProfile(req.body);
            const response: ApiResponse<Student> = { success: true, data: student };
            res.status(201).json(response);
        } catch (error: any) {
            const response: ApiResponse = { success: false, error: error.message };
            res.status(400).json(response);
        }
    }

    static updateProfile(req: Request<{ studentId: string }>, res: Response) {
        const student = ProfileService.updateProfile(req.params.studentId, req.body);
        if (!student) {
            const response: ApiResponse = { success: false, error: "Profile not found" };
            return res.status(404).json(response);
        }
        const response: ApiResponse<Student> = { success: true, data: student };
        res.json(response);
    }

    static getCompleteness(req: Request<{ studentId: string }>, res: Response) {
        const completeness = ProfileService.getCompleteness(req.params.studentId);
        if (completeness === null) {
            const response: ApiResponse = { success: false, error: "Profile not found" };
            return res.status(404).json(response);
        }
        const response: ApiResponse<{ score: number }> = { success: true, data: { score: completeness } };
        res.json(response);
    }
}
