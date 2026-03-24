import { Student } from '../../shared/contracts/types';
import { ProfileRepository } from './repository';
import { CreateProfileDTO, UpdateProfileDTO } from './types';
import { calculateProfileCompleteness } from './utils';

// Polyfill for environments missing native crypto.randomUUID
const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export class ProfileService {
    static getProfile(id: string): Student | null {
        return ProfileRepository.findById(id);
    }
    
    static createProfile(data: CreateProfileDTO): Student {
        const student: Student = {
            id: generateId(),
            ...data,
            profileCompleteness: 0,
            profileStrengthScore: 0
        };
        student.profileCompleteness = calculateProfileCompleteness(student);
        return ProfileRepository.save(student);
    }
    
    static updateProfile(id: string, data: UpdateProfileDTO): Student | null {
        const student = ProfileRepository.findById(id);
        if (!student) return null;
        
        const updated: Student = { ...student, ...data };
        updated.profileCompleteness = calculateProfileCompleteness(updated);
        return ProfileRepository.save(updated);
    }
    
    static getCompleteness(id: string): number | null {
        const student = ProfileRepository.findById(id);
        if (!student) return null;
        return calculateProfileCompleteness(student);
    }
}
