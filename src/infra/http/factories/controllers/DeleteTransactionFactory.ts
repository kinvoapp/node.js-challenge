import { Request, Response } from 'express'
import { DeleteTransactionController } from '../../../../modules/transactions/controllers/DeleteTransactionController'
import { PrismaTransactionsRepository } from '../../../../modules/transactions/repositories/prisma/PrismaTransactionsRepository'
import { DeleteTransaction } from '../../../../modules/transactions/usecases/DeleteTransaction'

export const deleteTransactionFactory = (req: Request, res: Response) => {
  const prismaRepo = new PrismaTransactionsRepository()
  const deleteTransaction = new DeleteTransaction(prismaRepo)
  const deleteTransactionController = new DeleteTransactionController(deleteTransaction)

  return deleteTransactionController.handle(req, res)
}
