import { RequestHandler } from 'express';

const loginValidate: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!email.match(/\S+@\S+\.\S+/)) {
    return res.status(401).send({ message: 'Incorrect email or password' });
  }

  next();
};

export default loginValidate;
