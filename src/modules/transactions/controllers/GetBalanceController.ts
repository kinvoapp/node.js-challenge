import { Request, Response } from 'express'
import { GetBalance } from '../usecases/GetBalance'

export class GetBalanceController {
  constructor(private getBalance: GetBalance) {}

  async handle(req: Request, res: Response) {
    const result = await this.getBalance.execute()

    return res.status(200).json({ balance: result })
  }
}
