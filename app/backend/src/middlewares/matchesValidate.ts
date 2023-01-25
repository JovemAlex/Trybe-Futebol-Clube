import { RequestHandler } from 'express';

const matchesValidate: RequestHandler = (req, res, next) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamId || !awayTeamId || !homeTeamGoals || !awayTeamGoals) {
    return res.status(400).json({ message: 'Fields not be undefined' });
  }

  return next();
};

export default matchesValidate;
