export interface CreateJobRequest {
  title: string;
  companyId: string;
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

export interface UpdateJobRequest extends Partial<CreateJobRequest> {}

export interface JobFilterQuery {
  cgpa?: number;
  location?: string;
  skills?: string[];
  mode?: string;
  shift?: string;
}
