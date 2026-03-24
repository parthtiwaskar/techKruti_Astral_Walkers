import { Student } from '../../shared/contracts/types';

export type CreateProfileDTO = Omit<Student, 'id' | 'profileCompleteness' | 'profileStrengthScore'>;
export type UpdateProfileDTO = Partial<CreateProfileDTO>;
