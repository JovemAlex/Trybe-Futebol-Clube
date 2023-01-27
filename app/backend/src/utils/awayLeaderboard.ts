import Match from '../database/models/Match';
import ITeamLeaderboard from '../interfaces/ITeamLeaderboard';

export default class AwayLeaderboard {
  constructor(private _model = new Match()) { }

  private calculateAwayMatchPoints = (match: Match, teamTotalPoints: number) => {
    const { homeTeamGoals, awayTeamGoals } = match;

    if (homeTeamGoals > awayTeamGoals) return teamTotalPoints + 3;

    if (homeTeamGoals === awayTeamGoals) return teamTotalPoints + 1;

    return teamTotalPoints;
  };

  private calculateAwayWins = (match: Match, teamTotalWins: number) => {
    const { awayTeamGoals, homeTeamGoals } = match;

    const awayWin = awayTeamGoals > homeTeamGoals ? 1 : 0;

    const wins = teamTotalWins + awayWin;

    return wins;
  };

  private calculateAwayDraws = (match: Match, teamTotalDraws: number) => {
    const { awayTeamGoals, homeTeamGoals } = match;

    const awayDraw = awayTeamGoals === homeTeamGoals ? 1 : 0;

    const draws = teamTotalDraws + awayDraw;

    return draws;
  };

  private calculateAwayLosses = (match: Match, teamTotalLosses: number) => {
    const { awayTeamGoals, homeTeamGoals } = match;

    const awayDefeat = awayTeamGoals < homeTeamGoals ? 1 : 0;

    const defeats = teamTotalLosses + awayDefeat;

    return defeats;
  };

  public teamAwayLeadeboard = (team: ITeamLeaderboard, match: Match) => {
    const { awayTeamGoals, homeTeamGoals } = match;

    const teamData = team;

    teamData.totalPoints = this.calculateAwayMatchPoints(match, teamData.totalPoints);
    teamData.totalGames += 1;
    teamData.totalVictories = this.calculateAwayWins(match, teamData.totalVictories);
    teamData.totalDraws = this.calculateAwayDraws(match, teamData.totalDraws);
    teamData.totalLosses = this.calculateAwayLosses(match, teamData.totalLosses);
    teamData.goalsFavor += awayTeamGoals;
    teamData.goalsOwn += homeTeamGoals;
    teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
    teamData.efficiency = Number(
      ((teamData.totalPoints / (teamData.totalGames * 3)) * 100).toFixed(2),
    );

    return teamData;
  };
}
