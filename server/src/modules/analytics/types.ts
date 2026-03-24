export interface DashboardSummary {
    profileCompletenessScore: number;
    skillDistribution: Record<string, number>;
    domainReadiness: Record<string, number>;
    resumeStatus: "missing" | "needs_improvement" | "good" | "excellent";
    suggestedNextActions: string[];
    profileStrengthScore: number;
}
