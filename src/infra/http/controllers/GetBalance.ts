import { Request, Response } from "express"
import { GetBalanceUseCase } from "../../../app/useCases/getBalanceUseCase"

export class GetBalanceController {
  getBalanceUseCase: GetBalanceUseCase
  constructor(getBalanceUseCase: GetBalanceUseCase) {
    this.getBalanceUseCase = getBalanceUseCase
  }
  async handle(req: Request, res: Response) {
    const balance = await this.getBalanceUseCase.execute()
    return res.status(200).json({ balance: balance })
  }
}
