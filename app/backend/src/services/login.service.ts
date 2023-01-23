import { compare } from 'bcryptjs';
import User from '../database/models/User';
import { createNewToken } from '../auth/loginToken';

const LoginService = async (email: string, password: string) => {
  const result = await User.findOne({ where: { email } });

  if (!result) return { type: 401, message: 'Incorrect email or password' };

  const passwordIsValid = await compare(password, result.password);

  if (!passwordIsValid) {
    return { type: 401, message: 'Incorrect email or password' };
  }

  const token: string = createNewToken({ email, id: result.id, username: result.username });

  return { type: 200, message: token };
};

export default LoginService;
