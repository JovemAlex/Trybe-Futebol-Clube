import { RequestHandler } from 'express';
import Teams from '../services/teamsService';

export default class TeamController {
  constructor(private _service = new Teams()) { }

  public getAllTeams: RequestHandler = async (_req, res) => {
    const { status, message, isError, teamsExists } = await this._service.getAll();

    if (isError) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(teamsExists);
  };
}
