import { Student } from '../../shared/contracts/types';

// In-memory mock storage ensuring parallel-safe independent development
const students: Map<string, Student> = new Map();

export const ProfileRepository = {
    findById: (id: string): Student | null => students.get(id) || null,
    
    save: (student: Student): Student => {
        students.set(student.id, student);
        return student;
    },
    
    // Adding optional mock initializer
    seedMockData: (mockStudent: Student) => {
        students.set(mockStudent.id, mockStudent);
    }
};
