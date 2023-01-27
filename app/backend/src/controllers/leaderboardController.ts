import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private _service = new LeaderboardService()) { }

  public homeLeaderboard: RequestHandler = async (req, res) => {
    const { status, message } = await this._service.homeLeadeboard();

    return res.status(status).json(message);
  };
}
