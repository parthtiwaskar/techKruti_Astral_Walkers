export interface ResumeAnalysisResult {
    extractedSkills: string[];
    extractedProjects: string[];
    missingSections: string[];
    improvements: string[];
    confidenceScore: number;
}
