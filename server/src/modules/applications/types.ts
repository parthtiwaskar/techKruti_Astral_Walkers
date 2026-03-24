export interface ApplyJobRequest {
  studentId: string;
  jobId: string;
}

export interface UpdateApplicationStatusRequest {
  status: "applied" | "shortlisted" | "interview" | "rejected" | "offered";
}
