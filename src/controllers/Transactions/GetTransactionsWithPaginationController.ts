import { Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UserAuthInfoRequest } from '../../interfaces/UserAuthInfoRequest';

export class GetTransactionsWithPaginationController {
  async handle(request: UserAuthInfoRequest, response: Response) {
    const { resultsPerPage, page } = request.query;
    const user_id = request.userId;

    if (!resultsPerPage || !page) return response.status(400).json({ message: 'Parmâmetros inválidos, verifique sua consulta' })

    const transactions = await prismaClient.transaction.findMany({
      where: { user_id },
      skip: (Number(resultsPerPage) * (Number(page) - 1)),
      take: (Number(resultsPerPage))
    });

    return response.status(200).json(transactions);
  }
}