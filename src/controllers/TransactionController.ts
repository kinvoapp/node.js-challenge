import { Request, Response } from 'express'

import Transaction from '../schemas/Transaction'

const TransactionController = {
  async index (req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find()

    return res.json(transactions)
  }
}

export default TransactionController
