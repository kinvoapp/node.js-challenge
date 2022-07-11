import { MovementTypeEnum } from './../enumerators/MovementTypeEnum';
import httpStatus from 'http-status';
import { MovementRepository } from '../database/repositories/MovementRepository';
import { IMovement } from '../interfaces/IMovement';
import { AppError } from '../utils/errors/AppError';
import { ISearchParameter } from '../interfaces/ISearchParameter';

export class MovementService {
  public static async create({ name, description, formOfPayment, type, value, date }: any) {
    const movementFound = await MovementService.getByName(name, { lean: false });

    if (movementFound) {
      throw new AppError(httpStatus.CONFLICT, 'Já existe uma movimentação financeira com esse mesmo nome!');
    }

    const response = await MovementRepository.create({ name, description, formOfPayment, type, value, date });
    return response;
  }

  public static async getAll({ where, order }: ISearchParameter) {
    where = {
      ...where,
      deletedAt: null,
    };

    const response = await MovementRepository.selectAll(where, order);

    if (response.rows && !response.rows.length) {
      throw new AppError(httpStatus.NOT_FOUND, 'Nenhuma movimentação financeira foi encontrada!');
    }

    return response;
  }

  public static async calculateBalance() {
    const options: ISearchParameter = {
      where: {},
      order: { offset: 0, limit: 0 },
    };

    const movementList = await MovementService.getAll(options);

    let balance: any = 0.00;

    movementList.rows.forEach((movement: IMovement) => {
      if (movement.type === MovementTypeEnum.REVENUES) {
        balance += movement.value;
      } else if (movement.type === MovementTypeEnum.EXPENSES) {
        balance -= movement.value;
      }
    });

    const response = {
      balance,
      movementsCount: movementList.count,
    };
    return response;
  }
  
  public static async getById(id: string, options?: any) {
    const response = await MovementRepository.selectOne({ _id: id, deletedAt: null }, options);
    
    if (!response) {
      throw new AppError(httpStatus.NOT_FOUND, 'Nenhuma movimentação financeira foi encontrada!');
    }

    return response;
  }

  public static async getByName(name: string, options?: any) {
    const response = await MovementRepository.selectOne({ name, deletedAt: null }, options);
    return response;
  }

  public static async updateById(id: string, { name, description, formOfPayment, type, value, date }: any) {
    let movement: IMovement = await MovementService.getByName(name, { lean: true });

    if (String(movement._id) !== id) {
      throw new AppError(httpStatus.CONFLICT, 'Já existe uma outra movimentação financeira com esse mesmo nome!');
    }

    movement = {
      ...movement,
      name,
      description,
      formOfPayment,
      type,
      value,
      date,
    };

    const response = await MovementRepository.updateOne({ _id: id }, movement);
    return response;
  }

  public static async removeById(id: string) {
    await MovementService.getById(id, { lean: false });
    await MovementRepository.deleteOne({ _id: id });

    return { message: 'Movimentação financeira removida com sucesso!' };
  }
}