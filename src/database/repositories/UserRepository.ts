import httpStatus from 'http-status';
import User from '../../entities/User';
import { IUser } from '../../interfaces/IUser';
import { AppError } from '../../utils/errors/AppError';

export class UserRepository {
  public static async create(data: IUser) {
    let response = null;

    try {
      response = await User.create(data);
    } catch (err) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${err}`);
    }

    return response;
  }

  public static async selectOne(where?: any) {
    let response = null;
    
    try {
      response = await User.findOne(where);
    } catch (err) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${err}`);
    }

    return response;
  }
}