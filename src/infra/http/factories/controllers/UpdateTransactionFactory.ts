import { Request, Response } from 'express'
import { UpdateTransactionController } from '../../../../modules/transactions/controllers/UpdateTransactionController'
import { PrismaTransactionsRepository } from '../../../../modules/transactions/repositories/prisma/PrismaTransactionsRepository'
import { UpdateTransaction } from '../../../../modules/transactions/usecases/UpdateTransaction'

export const updateTransactionFactory = (req: Request, res: Response) => {
  const prismaRepo = new PrismaTransactionsRepository()
  const updateTransaction = new UpdateTransaction(prismaRepo)
  const updateTransactionController = new UpdateTransactionController(updateTransaction)

  return updateTransactionController.handle(req, res)
}
