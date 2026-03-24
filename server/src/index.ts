import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import analyticsRouter from './modules/analytics/routes';
import applicationsRouter from './modules/applications/routes';
import companiesRouter from './modules/companies/routes';
import jobsRouter from './modules/jobs/routes';
import notificationsRouter from './modules/notifications/routes';
import profileRouter from './modules/profile/routes';
import resumeRouter from './modules/resume/routes';
import skillEngineRouter from './modules/skill-engine/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Legacy/Opportunity endpoints
app.use('/api/companies', companiesRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/stats', analyticsRouter); 

// Student layer endpoints
app.use('/api/analytics', analyticsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/skill-engine', skillEngineRouter);

app.post('/api/auth/register', async (req, res) => {
  res.status(201).json({ message: 'Sync stub' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 PlaceBridge server running on http://localhost:${port}`);
});

setInterval(() => {}, 1000 * 60 * 60);
