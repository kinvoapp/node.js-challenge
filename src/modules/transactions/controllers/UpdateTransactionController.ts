import { Request, Response } from 'express'
import { UpdateTransaction } from '../usecases/UpdateTransaction'

export class UpdateTransactionController {
  constructor(private updateTransaction: UpdateTransaction) {}

  async handle(req: Request, res: Response) {
    const data = req.body

    await this.updateTransaction.execute(data)

    return res.status(200).send()
  }
}
