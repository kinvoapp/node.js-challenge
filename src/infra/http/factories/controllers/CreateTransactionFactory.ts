import { Request, Response } from 'express'
import { PrismaTransactionsRepository } from '../../../../modules/transactions/repositories/prisma/PrismaTransactionsRepository'
import { CreateTransaction } from '../../../../modules/transactions/usecases/CreateTransaction'
import { CreateTransactionController } from '../../../../modules/transactions/controllers/CreateTransactionController'

export const createTransactionFactory = (req: Request, res: Response) => {
  const prismaRepo = new PrismaTransactionsRepository()
  const createTransaction = new CreateTransaction(prismaRepo)
  const createTransactionController = new CreateTransactionController(createTransaction)

  return createTransactionController.handle(req, res)
}
