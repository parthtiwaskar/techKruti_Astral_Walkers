import { Request, Response } from 'express';
import { SkillEngineService } from './service';
import { ApiResponse } from '../../shared/contracts/api';
import { SkillSuggestionResponse } from './types';

export class SkillEngineController {
    static getSuggestions(req: Request<{ studentId: string }>, res: Response) {
        const studentId = req.params.studentId;
        const suggestions = SkillEngineService.getSuggestions(studentId);
        
        const response: ApiResponse<SkillSuggestionResponse> = { success: true, data: suggestions };
        res.json(response);
    }
}
