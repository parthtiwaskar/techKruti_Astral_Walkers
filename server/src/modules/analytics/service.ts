import { AnalyticsRepository } from './repository';
import { computeProfileStrengthScore, generateSkillDistribution } from './utils';
import { DashboardSummary } from './types';

export class AnalyticsService {
    static getSummary(studentId: string): DashboardSummary {
        const data = AnalyticsRepository.getMockStudentData(studentId);
        
        // Mocking completeness to 80 if data exists
        const completeness = data ? 80 : 0;
        const skillCount = data.skills.length;
        
        const summary: DashboardSummary = {
            profileCompletenessScore: completeness,
            skillDistribution: generateSkillDistribution(data.skills),
            domainReadiness: {
                frontend: 70,
                backend: 40
            },
            resumeStatus: data.resumeUrl ? "good" : "missing",
            suggestedNextActions: [
                "Complete your profile by adding more external links.",
                "Upload a more recent resume.",
                "Learn Node.js to improve backend readiness."
            ],
            profileStrengthScore: computeProfileStrengthScore(completeness, skillCount, data.cgpa || 0)
        };
        
        return summary;
    }
}
