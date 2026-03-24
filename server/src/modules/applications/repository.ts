// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.
import { Application } from '../../shared/contracts/types';
import pool from '../../db/pool';

export class ApplicationRepository {
  private applications: Application[] = [];

  // MOCK LOGIC (Student Layer)
  public getAllMock(): Application[] { return this.applications; }
  public getByIdMock(id: string): Application | undefined { return this.applications.find(a => a.id === id); }
  public getByStudentAndJobMock(studentId: string, jobId: string): Application | undefined {
    return this.applications.find(a => a.studentId === studentId && a.jobId === jobId);
  }
  public getAllForStudentMock(studentId: string): Application[] {
    return this.applications.filter(a => a.studentId === studentId);
  }
  public createMock(application: Application): Application {
    this.applications.push(application);
    return application;
  }
  public updateMock(id: string, updates: Partial<Application>): Application | undefined {
    const index = this.applications.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    this.applications[index] = { ...this.applications[index], ...updates };
    return this.applications[index];
  }

  // DB LOGIC (Opportunity Layer)
  public async getApplicationsByFirebaseUid(firebaseUid: string): Promise<any[]> {
    const query = `
      SELECT a.*, c.name as company_name, c.role, c.logo_url
      FROM applications a
      JOIN companies c ON a.company_id = c.id
      JOIN users u ON a.user_id = u.id
      WHERE u.firebase_uid = $1
      ORDER BY a.applied_at DESC
    `;
    const result = await pool.query(query, [firebaseUid]);
    return result.rows;
  }
  public async getUserIdByFirebaseUid(firebaseUid: string): Promise<string | null> {
    const userResult = await pool.query('SELECT id FROM users WHERE firebase_uid = $1', [firebaseUid]);
    return userResult.rows.length > 0 ? userResult.rows[0].id : null;
  }
  public async checkCompanyApplication(userId: string, companyId: string): Promise<boolean> {
    const checkResult = await pool.query(
      'SELECT id FROM applications WHERE user_id = $1 AND company_id = $2',
      [userId, companyId]
    );
    return checkResult.rows.length > 0;
  }
  public async applyToCompanySQL(userId: string, companyId: string): Promise<any> {
    const insertQuery = `
      INSERT INTO applications (user_id, company_id, status)
      VALUES ($1, $2, 'Applied')
      RETURNING *
    `;
    const result = await pool.query(insertQuery, [userId, companyId]);
    return result.rows[0];
  }
}
export const applicationRepository = new ApplicationRepository();
