import { Router } from 'express';
import { SkillEngineController } from './controller';

const router = Router();

router.get('/:studentId/suggestions', SkillEngineController.getSuggestions);

export default router;
