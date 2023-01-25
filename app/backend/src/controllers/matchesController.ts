import { RequestHandler } from 'express';
import Matches from '../services/matchesService';
import { tokenVerify } from '../auth/loginToken';

export default class MatchesController {
  constructor(private _service = new Matches()) { }

  public getAllMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const {
        status,
        matches,
      } = await this._service.matchesByProgress(JSON.parse(inProgress as string));

      return res.status(status).json(matches);
    }

    const { status, message, isError, matches } = await this._service.getAllMatches();

    if (isError) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(matches);
  };

  public createMatches: RequestHandler = async (req, res) => {
    const token = req.headers.authorization;
    const { email } = tokenVerify(token as string);

    if (email === 'Invalid Token') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const { status, message, isError, newMatchCreated } = await this._service
      .createMatches(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    if (isError) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(newMatchCreated);
  };
}
