import { Request, Response } from "express"
import { CreateTransactionUseCase } from "../../../app/useCases/createTransactionUseCase"

export class CreateTransactionController {
  createTransactionUseCase: CreateTransactionUseCase
  constructor(createTransactionUseCase: CreateTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase
  }
  async handle(req: Request, res: Response) {
    const { title, description, date, type, amount } = req.body
    const transaction = await this.createTransactionUseCase.execute({ title, description, date, type, amount })
    return res.status(201).json(transaction)
  }
}
