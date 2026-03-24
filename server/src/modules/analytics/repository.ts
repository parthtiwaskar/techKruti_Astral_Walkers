// Isolated mock repository to fetch required analytics data without importing other modules' direct internals.
export const AnalyticsRepository = {
    getMockStudentData: (studentId: string) => {
        return {
            id: studentId,
            skills: ["React", "JavaScript", "Python", "SQL"],
            resumeUrl: "https://example.com/resume.pdf",
            cgpa: 8.5
        };
    }
};
