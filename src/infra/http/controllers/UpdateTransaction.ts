import { Request, Response } from "express"
import { UpdateTransactionUseCase } from "../../../app/useCases/updateTransactionUseCase"

export class UpdateTransactionController {
  updateTransactionUseCase: UpdateTransactionUseCase
  constructor(updateTransactionUseCase: UpdateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { uid } = req.params
    const { amount, description, date, title, type } = req.body
    const transaction = { amount, description, date, title, type }
    Object.keys(transaction).forEach((key) => {
      if (!transaction[key]) delete transaction[key]
    })
    await this.updateTransactionUseCase.execute(uid, transaction)
    res.status(204).send()
  }
}
