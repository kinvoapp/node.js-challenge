import { Request, Response } from "express"
import { GetTransactionUseCase } from "../../../app/useCases/getTransactionsUseCase"

export class GetTransactionController {
  getTransactionUseCase: GetTransactionUseCase
  constructor(getTransactionUseCase: GetTransactionUseCase) {
    this.getTransactionUseCase = getTransactionUseCase
  }
  async handle(req: Request, res: Response) {
    const { uid } = req.params
    const transaction = await this.getTransactionUseCase.execute(uid)
    return res.status(200).json(transaction)
  }
}
