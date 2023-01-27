import Match from '../database/models/Match';
import ITeamLeaderboard from '../interfaces/ITeamLeaderboard';

export default class HomeLeaderboard {
  constructor(private _model = new Match()) { }

  private calculateHomeMatchPoints = (match: Match, teamTotalPoints: number) => {
    const { homeTeamGoals, awayTeamGoals } = match;

    if (homeTeamGoals > awayTeamGoals) return teamTotalPoints + 3;

    if (homeTeamGoals === awayTeamGoals) return teamTotalPoints + 1;

    return teamTotalPoints;
  };

  private calculateHomeWins = (match: Match, teamTotalWins: number) => {
    const { homeTeamGoals, awayTeamGoals } = match;

    const homeWin = homeTeamGoals > awayTeamGoals ? 1 : 0;

    const wins = teamTotalWins + homeWin;

    return wins;
  };

  private calculateHomeDraws = (match: Match, teamTotalDraws: number) => {
    const { homeTeamGoals, awayTeamGoals } = match;

    const homeDraw = homeTeamGoals === awayTeamGoals ? 1 : 0;

    const draws = teamTotalDraws + homeDraw;

    return draws;
  };

  private calculateHomeLosses = (match: Match, teamTotalLosses: number) => {
    const { homeTeamGoals, awayTeamGoals } = match;

    const homeDefeat = homeTeamGoals < awayTeamGoals ? 1 : 0;

    const defeats = teamTotalLosses + homeDefeat;

    return defeats;
  };

  public teamHomeLeadeboard = (team: ITeamLeaderboard, match: Match) => {
    const { homeTeamGoals, awayTeamGoals } = match;

    const teamData = team;

    teamData.totalPoints = this.calculateHomeMatchPoints(match, team.totalPoints);
    teamData.totalGames += 1;
    teamData.totalVictories = this.calculateHomeWins(match, team.totalVictories);
    teamData.totalDraws = this.calculateHomeDraws(match, team.totalDraws);
    teamData.totalLosses = this.calculateHomeLosses(match, team.totalLosses);
    teamData.goalsFavor += homeTeamGoals;
    teamData.goalsOwn += awayTeamGoals;
    teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
    teamData.efficiency = Number(((teamData
      .totalPoints / (teamData.totalGames * 3)) * 100).toFixed(2));

    return team;
  };
}
