import { SignOptions, sign, verify } from 'jsonwebtoken';
import IToken from '../interfaces/IToken';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export const createNewToken = (user: IToken): string => {
  const token = sign({ data: user }, secret, jwtConfig);
  return token;
};

export const tokenVerify = (authorization: string): IToken => {
  try {
    const payload = verify(authorization, secret);
    return payload as IToken;
  } catch (error) {
    console.log(error);
    return { email: 'Invalid token' };
  }
};
