import { ResumeRepository } from './repository';
import { analyzeResumeMock } from './utils';
import { ResumeAnalysisResult } from './types';

export class ResumeService {
    static getAnalysis(studentId: string): ResumeAnalysisResult {
        // Mocking behavior: auto-generating a mock if none exists
        let analysis = ResumeRepository.findByStudentId(studentId);
        if (!analysis) {
            analysis = analyzeResumeMock("Simulated uploaded resume text...");
            ResumeRepository.save(studentId, analysis);
        }
        return analysis;
    }
}
