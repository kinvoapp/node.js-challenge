import { Request, Response } from 'express'
import { ListByDateProps, ListTransactionByDate } from '../usecases/ListTransactionByDate'

export class ListTransactionByDateController {
  constructor(private listTransactionByDate: ListTransactionByDate) {}

  async handle(req: Request, res: Response) {
    const { initialDate, finalDate } = req.params
    const transactions = await this.listTransactionByDate.execute({
      initialDate,
      finalDate
    } as ListByDateProps)
    return res.status(200).json(transactions)
  }
}
