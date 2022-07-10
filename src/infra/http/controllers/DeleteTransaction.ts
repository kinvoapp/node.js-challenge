import { Request, Response } from "express"
import { DeleteTransactionUseCase } from "../../../app/useCases/deleteTransactionUseCase"
import { AppError } from "../../shared/errors/AppError"

export class DeleteTransactionController {
  deleteTransactionsUseCase: DeleteTransactionUseCase
  constructor(deleteTransactionsUseCase: DeleteTransactionUseCase) {
    this.deleteTransactionsUseCase = deleteTransactionsUseCase
  }
  async handle(req: Request, res: Response) {
    const transaction = await this.deleteTransactionsUseCase.execute(req.params.uid)
    return res.status(200).json(transaction)
  }
}
