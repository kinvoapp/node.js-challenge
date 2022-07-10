import { Request, Response } from 'express'
import { DeleteTransaction } from '../usecases/DeleteTransaction'

export class DeleteTransactionController {
  constructor(private deleteTransaction: DeleteTransaction) {}

  async handle(req: Request, res: Response) {
    const data = req.body

    await this.deleteTransaction.execute(data)

    return res.status(200).send()
  }
}
