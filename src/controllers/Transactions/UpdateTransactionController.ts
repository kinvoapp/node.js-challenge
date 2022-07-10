import { Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UserAuthInfoRequest } from '../../interfaces/UserAuthInfoRequest';

export class UpdateTransactionController {
  async handle(request: UserAuthInfoRequest, response: Response) {
    const { description, amount, date } = request.body;
    const { id } = request.params;

    try {
      const updateTransaction = await prismaClient.transaction.update({
        where: {
          id,
        },
        data: {
          description,
          amount,
          date: new Date(date)
        }
      });

      return response.status(200).json(updateTransaction);
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'Erro ao atualizar transação' })
    }
  }
}