export interface Student {
  id: string;
  // New additive fields based on student intelligence layer requirements
  name?: string;
  email?: string;
  cgpa: number;
  backlogCount: number;
  skills: string[]; // List of skills
  // Legacy preferences mapping (must be kept for backward compatibility)
  preferences: {
    mode: "onsite" | "remote" | "hybrid";
    shift: "day" | "night" | "flexible";
    location: string[];
  };
  
  // Expanded student-owned fields
  domainPreferences?: string[];
  workModePreferences?: ("onsite" | "remote" | "hybrid")[];
  shiftPreferences?: ("day" | "night" | "flexible")[];
  locationPreferences?: string[];
  
  resumeUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  
  profileCompleteness?: number;
  profileStrengthScore?: number;
}

export interface Job {
  id: string;
  title?: string;
  companyId?: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minCgpa: number;
  maxBacklogs: number;
  domain: string;
  location: string;
  mode: string;
  shift: string;
  salaryRange?: string;
  deadline?: string;
}

export interface Recommendation {
  jobId: string;
  score: number;
  reasons: string[];
}

export interface SkillGap {
  missingSkills: string[];
  strengths: string[];
  severity: "low" | "medium" | "high";
}

export interface Application {
  id: string;
  studentId: string;
  jobId: string;
  status: "applied" | "shortlisted" | "interview" | "rejected" | "offered";
  appliedAt?: string;
  updatedAt?: string;
  statusHistory?: { status: string; timestamp: string }[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  domain: string;
}

export interface Notification {
  id: string;
  studentId: string;
  message: string;
  type: string;
  createdAt: string;
  read: boolean;
}
