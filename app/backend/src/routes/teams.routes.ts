import { Router } from 'express';
import TeamController from '../controllers/teamsController';

const controller = new TeamController();

const router = Router();

router.get('/', controller.getAllTeams);

export default router;
