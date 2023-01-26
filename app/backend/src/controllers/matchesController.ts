import { RequestHandler } from 'express';
import Matches from '../services/matchesService';
// import { tokenVerify } from '../auth/loginToken';

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
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const { status, message, isError } = await this._service
      .createMatches(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    if (isError) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(message);
  };

  public matchFinished: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this._service.matchFinished(id);

    return res.status(status).json({ message });
  };

  public updateMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { status, message } = await this._service.updateMatch(id, homeTeamGoals, awayTeamGoals);

    return res.status(status).json({ message });
  };
}
