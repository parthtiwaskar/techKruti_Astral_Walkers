import { ResumeAnalysisResult } from './types';

// Mock intelligence function to mimic a parsed resume
export function analyzeResumeMock(text: string): ResumeAnalysisResult {
    return {
        extractedSkills: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
        extractedProjects: ["E-commerce Platform Architecture", "Real-time Weather Dashboard"],
        missingSections: ["Certifications", "Volunteer Experience", "Soft Skills"],
        improvements: [
            "Add quantifiable metrics to project accomplishments",
            "Include a professional summary highlighting top achievements",
            "List links to live deployments for your projects"
        ],
        confidenceScore: 88
    };
}
