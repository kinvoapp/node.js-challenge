import httpStatus from 'http-status';
import Movement from '../../entities/Movement';
import { IControllerPagination } from '../../interfaces/IControllerPagination';
import { AppError } from '../../utils/errors/AppError';
import { IMovement } from './../../interfaces/IMovement';

export class MovementRepository {
  public static async create(data: IMovement) {
    let response: any = null;

    try {
      response = await Movement.create(data);
    } catch (err) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${err}`);
    }

    return response;
  }

  public static async selectAll(where: any, order: IControllerPagination) {
    let response: any = null;

    try {
      response = await Movement.find(where).limit(order.limit).skip(order.offset);
    } catch (err) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${err}`);
    }

    return response;
  }

  public static async selectOne(where: any, options?: any) {
    let response: any = null;

    try {
      response = await Movement.findOne(where).lean(options.lean);
    } catch (err) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${err}`);
    }

    return response;
  }

  public static async updateOne(where: any, data: IMovement) {
    let response: any = null;

    try {
      await Movement.updateOne(where, data);
      response = await MovementRepository.selectOne(where, { lean: false });
    } catch (err) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${err}`);
    }

    return response;
  }

  public static async deleteOne(where: any) {
    let response: any = null;

    try {
      response = await Movement.updateOne(where, { deletedAt: new Date() });
    } catch (err) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error: ${err}`);
    }

    return response;
  }
}