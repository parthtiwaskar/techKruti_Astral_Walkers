// Isolated mock repository to avoid cross-module direct imports
// Adheres strictly to PlaceBridge architectural boundary rules
export const SkillEngineRepository = {
    getMockStudentSkills: (_studentId: string): string[] => {
        // In a real scenario, this would call the internal API layer or DB. 
        // Returning mock skills to decouple from Profile module.
        return ["React", "Node.js"];
    }
};
