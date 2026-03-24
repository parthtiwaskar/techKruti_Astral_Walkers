export interface SkillSuggestion {
    suggestedSkills: string[];
    rationale: string;
    priority: "high" | "medium" | "low";
    domainMapping: string;
}

export interface SkillSuggestionResponse {
    suggestions: SkillSuggestion[];
}
