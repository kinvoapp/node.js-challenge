import { Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UserAuthInfoRequest } from '../../interfaces/UserAuthInfoRequest';

export class CreateTransactionController {
  async handle(request: UserAuthInfoRequest, response: Response) {
    const { description, amount, date } = request.body;
    const user_id = request.userId;

    try {
      const newTransaction = await prismaClient.transaction.create({
        data: {
          description,
          amount,
          date: new Date(date),
          user_id
        }
      });

      return response.status(201).json(newTransaction);
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'Erro ao cadastrar transação' })
    }
  }
}