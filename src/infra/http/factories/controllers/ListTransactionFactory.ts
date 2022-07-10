import { Request, Response } from 'express'
import { ListTransactionController } from '../../../../modules/transactions/controllers/ListTransactionController'
import { PrismaTransactionsRepository } from '../../../../modules/transactions/repositories/prisma/PrismaTransactionsRepository'
import { ListTransaction } from '../../../../modules/transactions/usecases/ListTransaction'

export const listTransactionFactory = (req: Request, res: Response) => {
  const prismaRepo = new PrismaTransactionsRepository()
  const listTransaction = new ListTransaction(prismaRepo)
  const listTransactionController = new ListTransactionController(listTransaction)

  return listTransactionController.handle(req, res)
}
