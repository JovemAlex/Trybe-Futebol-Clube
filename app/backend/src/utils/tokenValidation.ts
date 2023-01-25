import { RequestHandler } from 'express';
import { tokenServiceValidation } from '../services/loginService';

export default class TokenValidation {
  public validation: RequestHandler = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) res.status(400).json({ response: 'Token inexistente' });

    const { status, message, isError } = await tokenServiceValidation(authorization as string);

    if (isError) return res.status(status).json({ message });

    return res.status(status).json({ role: message });
  };
}
