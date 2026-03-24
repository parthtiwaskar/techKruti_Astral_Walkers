import { companyService } from './src/modules/companies/service';
import { jobService } from './src/modules/jobs/service';
import { applicationService } from './src/modules/applications/service';
import { notificationService } from './src/modules/notifications/service';

async function run() {
  console.log('--- Creating Company ---');
  const company = companyService.createCompany({
    name: 'Tech Corp',
    description: 'A great tech company',
    domain: 'Software',
    location: 'Remote'
  });
  console.log(company);

  console.log('\n--- Creating Job ---');
  const job = jobService.createJob({
    title: 'Frontend Developer',
    companyId: company.id,
    requiredSkills: ['React', 'TypeScript'],
    preferredSkills: ['Node.js'],
    minCgpa: 7.5,
    maxBacklogs: 0,
    domain: 'Engineering',
    location: 'Remote',
    mode: 'remote',
    shift: 'day'
  });
  console.log(job);

  console.log('\n--- Applying to Job ---');
  const studentId = 'stu-123';
  const app = applicationService.applyToJob({
    studentId,
    jobId: job.id
  });
  console.log(app);

  console.log('\n--- Getting Notifications ---');
  console.log(notificationService.getForStudent(studentId));

  console.log('\n--- Updating Application Status ---');
  const updatedApp = applicationService.updateStatus(app.id, 'shortlisted');
  console.log(updatedApp);

  console.log('\n--- Getting Notifications Again ---');
  console.log(notificationService.getForStudent(studentId));

  console.log('\n--- Getting Dashboard ---');
  console.log(applicationService.getOpportunityDashboard(studentId));
}

run().catch(console.error);
