import { Request, Response } from 'express'
import { ListTransaction } from '../usecases/ListTransaction'

export class ListTransactionController {
  constructor(private listTransaction: ListTransaction) {}

  async handle(req: Request, res: Response) {
    const { page = 1 } = req.query
    const transactions = await this.listTransaction.execute(Number(page))

    res.status(200).json(transactions)
  }
}
