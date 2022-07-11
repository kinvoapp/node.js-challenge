import { Request, Response } from 'express'
import { ListTransactionByDateController } from '../../../../modules/transactions/controllers/ListTransactionByDateController'
import { PrismaTransactionsRepository } from '../../../../modules/transactions/repositories/prisma/PrismaTransactionsRepository'
import { ListTransactionByDate } from '../../../../modules/transactions/usecases/ListTransactionByDate'

export const listTransactionByDate = (req: Request, res: Response) => {
  const prismaRepo = new PrismaTransactionsRepository()
  const listTransactionsByDate = new ListTransactionByDate(prismaRepo)
  const listTransactionByDateController = new ListTransactionByDateController(
    listTransactionsByDate
  )

  return listTransactionByDateController.handle(req, res)
}
