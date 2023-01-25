import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const controller = new MatchesController();

const router = Router();

router.get('/', controller.getAllMatches);

export default router;
