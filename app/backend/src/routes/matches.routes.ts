import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import matchesValidate from '../middlewares/matchesValidate';
import equalsTeamsValidate from '../middlewares/equalsTeamsValidate';
import teamExistsValidate from '../middlewares/teamExistsValidate';
import tokenValidation from '../utils/tokenValidation';

const controller = new MatchesController();

const router = Router();

router.get('/', controller.getAllMatches);

router.post(
  '/',
  tokenValidation.tokenValidate,
  matchesValidate,
  equalsTeamsValidate,
  teamExistsValidate,
  controller.createMatches,
);

router.patch('/:id/finish', controller.matchFinished);
router.patch('/:id', controller.updateMatch);

export default router;
