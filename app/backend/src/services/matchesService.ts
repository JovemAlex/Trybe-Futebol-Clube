import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class Matches {
  constructor(private _model = Match) { }

  public async getAllMatches() {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (!matches) {
      return { status: 404, message: 'Matches not found', isError: true };
    }

    return { status: 200, matches, isError: false };
  }

  public async matchesByProgress(inProgress: boolean) {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],

      where: { inProgress },
    });

    if (!matches) {
      return { status: 404, message: 'Matches not found', isError: true };
    }

    return { status: 200, matches, isError: false };
  }
}
