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
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    const match = await Match.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });

    if (!match) {
      return { status: 500, message: 'Something went wrong', isError: true };
    }

    return { status: 201, message: match, isError: false };
  };

  public matchFinished = async (id: string) => {
    await Match.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: 'Finished' };
  };

  public updateMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { status: 200, message: 'Updated' };
  };
}
