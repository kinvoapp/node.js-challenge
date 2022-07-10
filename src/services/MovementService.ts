import { MovementTypeEnum } from './../enumerators/MovementTypeEnum';
import httpStatus from 'http-status';
import { MovementRepository } from '../database/repositories/MovementRepository';
import { IMovement } from '../interfaces/IMovement';
import { AppError } from '../utils/errors/AppError';
import { ISearchParameter } from '../interfaces/ISearchParameter';

export class MovementService {
  public static async create({ name, description, formOfPayment, type, value, date }: any) {
    const movementFound = await MovementService.getByName(name);

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

    const movementList = await MovementRepository.selectAll(where, order);
    
    if (!movementList.length) {
      throw new AppError(httpStatus.NOT_FOUND, 'Você não possui nenhuma movimentação financeira!');
    }

    const response = MovementService.calculateBalance(movementList);
    return response;
  }

  public static calculateBalance(movementList: Array<IMovement>) {    
    let balance: any = 0.00;

    movementList.forEach((movement: IMovement) => {
      if (movement.type === MovementTypeEnum.REVENUES) {
        balance += movement.value;
      } else if (movement.type === MovementTypeEnum.EXPENSES) {
        balance -= movement.value;
      }
    });

    const response = {
      balance,
      movementList,
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

  public static async getByName(name: string) {
    const response = await MovementRepository.selectOne({ name, deletedAt: null }, { lean: false });
    return response;
  }

  public static async updateById(id: string, { name, description, formOfPayment, type, value, date }: any) {
    let movement: IMovement = await MovementService.getById(id, { lean: true });

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