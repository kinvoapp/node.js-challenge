import httpStatus from 'http-status';
import { UserRepository } from '../database/repositories/UserRepository';
import { AppError } from '../utils/errors/AppError';

export class UserService {
  public static async getByEmail(email: string) {
    const response = await UserRepository.selectOne({ email });
    return response;    
  }

  public static async getById(id: string) {
    const response = await UserRepository.selectOne({ _id: id });

    if (!response) {
      throw new AppError(httpStatus.NOT_FOUND, 'Nenhum usuário foi encontrado!');
    }

    return response;    
  }
}