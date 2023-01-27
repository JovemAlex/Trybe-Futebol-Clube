import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const controller = new LeaderboardController();

const router = Router();

router.get('/home', controller.homeLeaderboard);

export default router;
