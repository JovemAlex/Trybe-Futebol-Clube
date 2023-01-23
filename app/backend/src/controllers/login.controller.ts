import { Request, Response } from 'express';
import LoginService from '../services/login.service';

const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { type, message } = await LoginService(email, password);

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(200).json({ token: message });
};

export default LoginController;
