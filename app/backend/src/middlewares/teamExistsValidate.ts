import { RequestHandler } from 'express';
import Team from '../database/models/Team';

const teamExistsValidate: RequestHandler = async (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;

  const homeTeam = await Team.findByPk(homeTeamId);
  const awayTeam = await Team.findByPk(awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  return next();
};

export default teamExistsValidate;
