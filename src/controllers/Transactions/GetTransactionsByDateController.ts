import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UserAuthInfoRequest } from '../../interfaces/UserAuthInfoRequest';

export class GetTransactionsByDateController {
  async handle (request: UserAuthInfoRequest, response: Response) {
    const { initialDate, finalDate } = request.query;
    const user_id = request.userId;

    if(!initialDate || !finalDate) return response.status(400).json({message: 'Parmâmetros inválidos, verifique sua consulta'})

    const transactions = await prismaClient.transaction.findMany({
      where: { 
        date: {
          lte: new Date(finalDate),
          gte: new Date(initialDate)
        },
        user_id
       }
    });

    if(!transactions.length) return response.status(404).json({ message: 'Nenhuma movimentação encontrada nesse período'})

    return response.status(200).json(transactions);
  }
}