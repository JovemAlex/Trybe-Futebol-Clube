import { RequestHandler } from 'express';
import Matches from '../services/matchesService';

export default class MatchesController {
  constructor(private _service = new Matches()) { }

  public getAllMatches: RequestHandler = async (_req, res) => {
    const { status, message, isError, matches } = await this._service.getAllMatches();

    if (isError) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(matches);
  };
}
