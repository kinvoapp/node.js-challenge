import { Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UserAuthInfoRequest } from '../../interfaces/UserAuthInfoRequest';

export class GetBalanceController {
  async handle(request: UserAuthInfoRequest, response: Response) {
    const user_id = request.userId;

    const sum = await prismaClient.transaction.groupBy({
      by: ['user_id'],
      _sum: {
        amount: true,
      },
      where: {
        user_id
      }
    });

    return response.status(200).json({ balance: sum[0]._sum });
  }
}