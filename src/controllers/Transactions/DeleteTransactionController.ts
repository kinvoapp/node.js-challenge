import { Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UserAuthInfoRequest } from '../../interfaces/UserAuthInfoRequest';

export class DeleteTransactionController {
  async handle(request: UserAuthInfoRequest, response: Response) {
    const { description, amount, date } = request.body;
    const { id } = request.params;

    try {
      const deeletedTransaction = await prismaClient.transaction.delete({
        where: {
          id
        }
      });

      return response.status(200).json(deeletedTransaction);
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'Erro ao excluir transação' })
    }
  }
}