import { UserService } from './UserService';
import { compare, hash } from 'bcryptjs';
import httpStatus from 'http-status';
import { UserRepository } from '../database/repositories/UserRepository';
import { IUser } from '../interfaces/IUser';
import { AppError } from '../utils/errors/AppError';
import { sign } from 'jsonwebtoken';
import { constants } from '../utils/constants';

export class AuthService {
  public static async register({ email, password }: IUser) {
    const userFound = await UserService.getByEmail(email);

    if (userFound) {
      throw new AppError(httpStatus.CONFLICT, 'Já existe um usuário cadastrado com esse email!');
    }

    password = await hash(password, 10);

    const response: any = await UserRepository.create({ email, password });

    response.password = undefined;
    return response;
  }

  public static async login({ email, password }: IUser) {
    const user = await UserService.getByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Login inválido!');
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Login inválido!');
    }

    const { key, expiresIn } = constants.jwt;

    const token = sign(
      { userId: String(user._id) },
      key,
      { expiresIn }
    );

    return { token };
  }
}