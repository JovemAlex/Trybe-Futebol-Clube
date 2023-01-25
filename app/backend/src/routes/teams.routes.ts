import { Router } from 'express';
import TeamController from '../controllers/teamsController';

const controller = new TeamController();

const router = Router();

router.get('/', controller.getAllTeams);
router.get('/:id', controller.getTeamById);

export default router;
