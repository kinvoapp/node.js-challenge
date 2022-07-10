import { Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UserAuthInfoRequest } from '../../interfaces/UserAuthInfoRequest';

export class GetAllTransactionsByUserController {
  async handle (request: UserAuthInfoRequest, response: Response) {
    const user_id = request.userId;

    const transactions = await prismaClient.transaction.findMany({
      where: { user_id }
    });

    return response.status(200).json(transactions);
  }
}