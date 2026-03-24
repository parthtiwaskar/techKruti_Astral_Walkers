import { ResumeAnalysisResult } from './types';

// In-memory isolated mock storage
const resumeAnalyses: Map<string, ResumeAnalysisResult> = new Map();

export const ResumeRepository = {
    findByStudentId: (studentId: string): ResumeAnalysisResult | null => resumeAnalyses.get(studentId) || null,
    
    save: (studentId: string, analysis: ResumeAnalysisResult): ResumeAnalysisResult => {
        resumeAnalyses.set(studentId, analysis);
        return analysis;
    }
};
