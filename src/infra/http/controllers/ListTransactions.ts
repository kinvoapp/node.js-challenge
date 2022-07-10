import { Request, Response } from "express"
import { ListTransactionUseCase } from "../../../app/useCases/listTransactionUseCase"
import { QueryParams } from "../services/queryParamParser"

export class ListTransactionsController {
  listTransactions: ListTransactionUseCase
  constructor(listTransactions: ListTransactionUseCase) {
    this.listTransactions = listTransactions
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const page = Number(req.query.page || 1)
    const perPage = Number(req.query.perPage || 25)
    const query = String(req.query.query || "")
    const queryArray = new QueryParams().handle(query as string, ["title", "description", "amount", "type", "date"])
    const transactions = await this.listTransactions.execute(page, perPage, queryArray)
    return res.status(200).json(transactions)
  }
}
