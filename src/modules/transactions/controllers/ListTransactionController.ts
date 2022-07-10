import { Request, Response } from 'express'
import { ListTransaction } from '../usecases/ListTransaction'

export class ListTransactionController {
  constructor(private listTransaction: ListTransaction) {}

  async handle(req: Request, res: Response) {
    const transactions = await this.listTransaction.execute()

    res.status(200).json(transactions)
  }
}
