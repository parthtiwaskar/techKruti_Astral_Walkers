import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('--- RESTARTING BACKEND ---');
import { companyRoutes } from './modules/companies/routes';
import { applicationRoutes } from './modules/applications/routes';
import careerAdvisorRoutes from './modules/career-advisor/routes';
import statsRouter from './routes/stats';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/career-advisor', careerAdvisorRoutes);
app.use('/api/stats', statsRouter);


app.post('/api/auth/register', async (req, res) => {
  // Logic to sync firebase user into our PostgreSQL 'users' table
  res.status(201).json({ message: 'Sync stub' });
});



app.get('/health', (req, res) => {
  res.json({ status: 'SUPER_FIXED', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`🚀 PlaceBridge server running on http://localhost:${port}`);
  });
}

export default app;

// Heartbeat to ensure the event loop stays alive in certain environments
setInterval(() => {}, 1000 * 60 * 60);

