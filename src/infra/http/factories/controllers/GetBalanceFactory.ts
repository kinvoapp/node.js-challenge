import { Request, Response } from 'express'
import { GetBalanceController } from '../../../../modules/transactions/controllers/GetBalanceController'
import { PrismaTransactionsRepository } from '../../../../modules/transactions/repositories/prisma/PrismaTransactionsRepository'
import { GetBalance } from '../../../../modules/transactions/usecases/GetBalance'

export const getBalanceFactory = (req: Request, res: Response) => {
  const prismaRepo = new PrismaTransactionsRepository()
  const getBalance = new GetBalance(prismaRepo)
  const getBalanceController = new GetBalanceController(getBalance)

  return getBalanceController.handle(req, res)
}
