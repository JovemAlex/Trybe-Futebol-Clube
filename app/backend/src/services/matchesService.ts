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

  public createMatches = async (
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ) => {
    const homeTeam = await Team.findByPk(homeTeamId);
    const awayTeam = await Team.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 404, message: 'There is no team with such id!', isError: true };
    }

    const newMatchCreated = await Match.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });

    if (!newMatchCreated) {
      return { status: 500, message: 'Internal Server Error', isError: true };
    }

    return { status: 201, newMatchCreated, isError: false };
  };
}
