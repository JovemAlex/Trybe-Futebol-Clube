import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ITeamLeaderboard from '../interfaces/ITeamLeaderboard';
import AwayLeaderboard from './awayLeaderboard';
import HomeLeaderboard from './homeLeaderboard';

const home = new HomeLeaderboard();
const away = new AwayLeaderboard();

const typeTeam: ITeamLeaderboard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

export default class Leaderboard {
  constructor(private _matchModel = new Match(), private _teamModel = new Team()) { }

  public data = (team: Team, matches: Match[], teamType: string): ITeamLeaderboard => {
    const teamPropertyData = JSON.parse(JSON.stringify(typeTeam));
    teamPropertyData.name = team.teamName;

    matches.forEach((match) => {
      const { homeTeamId, awayTeamId } = match;

      if (teamType === 'homeTeam' && homeTeamId === team.id) {
        home.teamHomeLeadeboard(teamPropertyData, match);
      }

      if (teamType === 'awayTeam' && awayTeamId === team.id) {
        away.teamAwayLeadeboard(teamPropertyData, match);
      }
    });

    return teamPropertyData;
  };

  public sortedTeams = (leaderboard: ITeamLeaderboard[]) => {
    const sortedLeadeboard = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
    return sortedLeadeboard;
  };
}
