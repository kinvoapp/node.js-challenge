import { Request, Response } from 'express'
import { ListByDateProps, ListTransactionByDate } from '../usecases/ListTransactionByDate'

export class ListTransactionByDateController {
  constructor(private listTransactionByDate: ListTransactionByDate) {}

  async handle(req: Request, res: Response) {
    const { initialDate, finalDate } = req.params
    const { page = 1 } = req.query
    const transactions = await this.listTransactionByDate.execute(
      {
        initialDate,
        finalDate
      } as ListByDateProps,
      Number(page)
    )
    return res.status(200).json(transactions)
  }
}
