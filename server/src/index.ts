import express from 'express';
import cors from 'cors';
console.log('--- RESTARTING BACKEND ---');
import dotenv from 'dotenv';
import { companyRoutes } from './modules/companies/routes';
import { applicationRoutes } from './modules/applications/routes';
import statsRouter from './routes/stats';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/stats', statsRouter);


app.post('/api/auth/register', async (req, res) => {
  // Logic to sync firebase user into our PostgreSQL 'users' table
  res.status(201).json({ message: 'Sync stub' });
});



app.get('/health', (req, res) => {
  res.json({ status: 'SUPER_FIXED', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 PlaceBridge server running on http://localhost:${port}`);
});

// Heartbeat to ensure the event loop stays alive in certain environments
setInterval(() => {}, 1000 * 60 * 60);

