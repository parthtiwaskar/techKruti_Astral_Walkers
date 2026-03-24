import { SkillSuggestion } from './types';

export const SkillTaxonomy: Record<string, { domain: string, related: string[] }> = {
    "React": { domain: "frontend", related: ["Redux", "Next.js", "Tailwind CSS"] },
    "Node.js": { domain: "backend", related: ["Express", "NestJS", "MongoDB"] },
    "Python": { domain: "data", related: ["Pandas", "TensorFlow", "PyTorch"] },
    "Java": { domain: "backend", related: ["Spring Boot", "Microservices"] }
};

export function generateSuggestions(knownSkills: string[]): SkillSuggestion[] {
    const suggestions: SkillSuggestion[] = [];
    
    for (const skill of knownSkills) {
        if (SkillTaxonomy[skill]) {
            const taxonomy = SkillTaxonomy[skill];
            suggestions.push({
                suggestedSkills: taxonomy.related,
                rationale: `Since you know ${skill}, these are highly requested in the ${taxonomy.domain} domain.`,
                priority: "high",
                domainMapping: taxonomy.domain
            });
        }
    }
    
    // Default suggestion if no overlaps
    if (suggestions.length === 0) {
        suggestions.push({
            suggestedSkills: ["Git", "Docker", "Agile Methodologies"],
            rationale: "These are foundational skills requested across most IT domains.",
            priority: "medium",
            domainMapping: "general"
        });
    }
    
    return suggestions;
}
