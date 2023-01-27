import Leaderboard from '../utils/leaderboard';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class LeaderboardService {
  constructor(
    private _matchModel = Match,
    private _teamModel = Team,
    private _leaderboard = new Leaderboard(),
  ) { }

  public homeLeadeboard = async () => {
    const homeMatches = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }],
    });

    const teams = await this._teamModel.findAll();

    const leaderboard = teams.map(
      (team) => this._leaderboard.data(team, homeMatches, 'homeTeam'),
    );

    const updatedLeaderboard = this._leaderboard.sortedTeams(leaderboard);

    return { status: 200, message: updatedLeaderboard };
  };
}
