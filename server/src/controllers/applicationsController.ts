import { Request, Response } from 'express';
import pool from '@/db/pool';
import { AuthRequest } from '@/middleware/verifyToken';

export const getApplications = async (req: AuthRequest, res: Response) => {
  const firebaseUid = req.user?.uid;
  if (!firebaseUid) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Join with companies to get role and name
    const query = `
      SELECT a.*, c.name as company_name, c.role, c.logo_url
      FROM applications a
      JOIN companies c ON a.company_id = c.id
      JOIN users u ON a.user_id = u.id
      WHERE u.firebase_uid = $1
      ORDER BY a.applied_at DESC
    `;
    const result = await pool.query(query, [firebaseUid]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const applyToCompany = async (req: AuthRequest, res: Response) => {
  const firebaseUid = req.user?.uid;
  const { companyId } = req.body;

  if (!firebaseUid || !companyId) {
    return res.status(400).json({ error: 'Missing information' });
  }

  try {
    // 1. Get user internal ID
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebaseUid]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found in database' });
    }
    const userId = userResult.rows[0].id;

    // 2. Check if already applied
    const checkResult = await pool.query(
      'SELECT id FROM applications WHERE user_id = $1 AND company_id = $2',
      [userId, companyId]
    );
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Already applied to this company' });
    }

    // 3. Insert application
    const insertQuery = `
      INSERT INTO applications (user_id, company_id, status)
      VALUES ($1, $2, 'Applied')
      RETURNING *
    `;
    const result = await pool.query(insertQuery, [userId, companyId]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
