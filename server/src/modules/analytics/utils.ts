export function computeProfileStrengthScore(completeness: number, skillCount: number, cgpa: number): number {
    let score = completeness * 0.5; // 50% weight
    score += Math.min(30, skillCount * 5); // 30% weight
    score += Math.min(20, (cgpa / 10) * 20); // 20% weight
    return Math.min(100, Math.round(score));
}

export function generateSkillDistribution(skills: string[]): Record<string, number> {
    // simplified mock logic
    const distribution: Record<string, number> = {
        frontend: 0,
        backend: 0,
        data: 0,
        general: 0
    };
    for (const skill of skills) {
        if (["React", "JavaScript", "HTML", "CSS"].includes(skill)) distribution.frontend += 25;
        else if (["Node.js", "Java", "SQL"].includes(skill)) distribution.backend += 25;
        else if (["Python", "Pandas"].includes(skill)) distribution.data += 25;
        else distribution.general += 25;
    }
    return distribution;
}
