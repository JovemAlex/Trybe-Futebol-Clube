import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import matchesValidate from '../middlewares/matchesValidate';

const controller = new MatchesController();

const router = Router();

router.get('/', controller.getAllMatches);
router.post('/', matchesValidate, controller.createMatches);

export default router;
