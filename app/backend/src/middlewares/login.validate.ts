import { Request, Response, NextFunction } from 'express';

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'All fields must be filled',
    });
  }

  const emailRegex = '/^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i';

  if (!email.match(emailRegex)) {
    return res.status(400).json({
      message: 'Incorrect email or password',
    });
  }

  next();
};

export default loginValidate;
