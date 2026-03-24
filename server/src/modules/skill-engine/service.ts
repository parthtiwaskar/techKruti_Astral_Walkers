import { SkillEngineRepository } from './repository';
import { generateSuggestions } from './utils';
import { SkillSuggestionResponse } from './types';

export class SkillEngineService {
    static getSuggestions(studentId: string): SkillSuggestionResponse {
        const knownSkills = SkillEngineRepository.getMockStudentSkills(studentId);
        const suggestions = generateSuggestions(knownSkills);
        return { suggestions };
    }
}
