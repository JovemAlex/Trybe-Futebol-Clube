import { Request, Response } from 'express';
import LoginService from '../services/loginService';

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message, token, isError } = await LoginService(email, password);

  if (isError) {
    return res.status(status).json({ message });
  }

  return res.status(status).json({ token });
};

// const tokenValidation = async (req: Request, res: Response) => {
//   const { authorization } = req.headers;

//   if (!authorization) res.status(400).json({ response: 'Token inexistente' });

//   const { status, message, isError } = await tokenServiceValidation(authorization as string);

//   if (isError) return res.status(status).json({ message });

//   return res.status(status).json({ role: message });
// };

export default { loginController };
