import { Request, Response } from 'express';
import pool from '@/db/pool';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const { eligibility, skill, package: pkg } = req.query;
    
    let query = 'SELECT * FROM companies';
    const values: any[] = [];
    
    // Simple filtering logic (can be expanded)
    if (eligibility || skill || pkg) {
      query += ' WHERE 1=1';
      // Implement specific filter logic here if needed
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
