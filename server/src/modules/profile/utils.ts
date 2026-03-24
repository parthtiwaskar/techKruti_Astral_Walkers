import { Student } from '../../shared/contracts/types';

export function calculateProfileCompleteness(student: Student): number {
    let score = 0;
    
    // Core details
    if (student.name) score += 10;
    if (student.email) score += 10;
    if (student.cgpa) score += 10;
    
    // Skills (weight: up to 20%)
    if (student.skills && student.skills.length > 0) {
        score += Math.min(20, student.skills.length * 5); // 5 points per skill max 20
    }
    
    // External Links (weight: 10% each)
    if (student.portfolioUrl) score += 10;
    if (student.githubUrl) score += 10;
    if (student.linkedinUrl) score += 10;
    if (student.resumeUrl) score += 10;
    
    // Preferences (weight: 10% total)
    if (student.preferences && student.preferences.location && student.preferences.location.length > 0) {
        score += 5;
    }
    if (student.domainPreferences && student.domainPreferences.length > 0) {
        score += 5;
    }
    
    return Math.min(100, score);
}
