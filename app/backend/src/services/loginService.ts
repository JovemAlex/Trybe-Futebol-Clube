import { compare } from 'bcryptjs';
import User from '../database/models/User';
import { createNewToken, tokenVerify } from '../auth/loginToken';
import IToken from '../interfaces/IToken';

const LoginService = async (email: string, password: string) => {
  const result = await User.findOne({ where: { email } });
  if (!result) {
    return { status: 401, message: 'Incorrect email or password', isError: true };
  }

  const passwordIsValid = await compare(password, result.password);
  if (!passwordIsValid) {
    return { status: 401, message: 'Incorrect email or password', isError: true };
  }

  const token: string = createNewToken({ email });
  return { status: 200, token, isError: false };
};

export const tokenServiceValidation = async (token: string) => {
  const { email }: IToken = tokenVerify(token);

  if (email === 'Invalid Token') return { status: 401, message: email, isError: true };

  const user = await User.findOne({ where: { email } });

  if (!user) return { status: 404, message: 'User not found', isError: true };

  return { status: 200, message: user.role, isError: false };
};

export default LoginService;
