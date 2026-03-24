import { Response } from 'express';
import pool from '@/db/pool';
import { AuthRequest } from '@/middleware/verifyToken';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  const firebaseUid = req.user?.uid;
  if (!firebaseUid) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebaseUid]);
    const userId = userResult.rows[0]?.id;

    const totalCompanies = await pool.query('SELECT COUNT(*) FROM companies');
    const eligibleCount = totalCompanies.rows[0].count; // Simplified for stub
    
    let appliedCount = '0';
    let interviewCount = '0';
    
    if (userId) {
      const appStats = await pool.query(
        "SELECT COUNT(*) FROM applications WHERE user_id = $1", 
        [userId]
      );
      appliedCount = appStats.rows[0].count;
      
      const intStats = await pool.query(
        "SELECT COUNT(*) FROM applications WHERE user_id = $1 AND status = 'Interviewing'",
        [userId]
      );
      interviewCount = intStats.rows[0].count;
    }

    res.json({
      totalCompanies: parseInt(totalCompanies.rows[0].count),
      eligibleCompanies: parseInt(eligibleCount),
      applicationsSubmitted: parseInt(appliedCount),
      upcomingDeadlines: 3 // Placeholder
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
