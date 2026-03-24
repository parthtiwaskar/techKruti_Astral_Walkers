// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import pool from '../../db/pool';

export const AnalyticsRepository = {
    // Student layer mocks
    getMockStudentData: (studentId: string) => {
        return {
            id: studentId,
            skills: ["React", "JavaScript", "Python", "SQL"],
            resumeUrl: "https://example.com/resume.pdf",
            cgpa: 8.5
        };
    },

    // Opportunity layer DB queries
    getTotalCompanies: async () => {
        const res = await pool.query('SELECT COUNT(*) FROM companies');
        return parseInt(res.rows[0].count);
    },
    getUserIdByFirebaseUid: async (firebaseUid: string) => {
        const res = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebaseUid]);
        return res.rows[0]?.id;
    },
    getApplicationsCount: async (userId: string) => {
        const res = await pool.query("SELECT COUNT(*) FROM applications WHERE user_id = $1", [userId]);
        return parseInt(res.rows[0].count);
    },
    getInterviewCount: async (userId: string) => {
        const res = await pool.query("SELECT COUNT(*) FROM applications WHERE user_id = $1 AND status = 'Interviewing'", [userId]);
        return parseInt(res.rows[0].count);
    }
};
