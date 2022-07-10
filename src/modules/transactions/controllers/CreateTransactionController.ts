import { Request, Response } from 'express'
import { CreateTransaction } from '../usecases/CreateTransaction'

export class CreateTransactionController {
  constructor(private createTransaction: CreateTransaction) {}

  async handle(req: Request, res: Response) {
    const data = req.body

    await this.createTransaction.execute(data)

    return res.status(201).send()
  }
}
