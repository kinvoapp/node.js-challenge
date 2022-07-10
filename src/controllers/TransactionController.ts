import { Request, Response } from 'express'

import Transaction from '../schemas/Transaction'

const TransactionController = {
  async index (req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find()

    return res.json(transactions)
  },

  async findById (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const transaction = await Transaction.findById(id)

    return res.json(transaction)
  },

  async store (req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.create(req.body)

    return res.json(transactions)
  },

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const transaction = await Transaction.findByIdAndUpdate(id, req.body)

    return res.json(transaction)
  },

  async delete (req: Request, res: Response) {
    const { id } = req.params

    return await Transaction.findByIdAndDelete(id)
      .then((transaction) => (transaction
        ? res.status(201).json({
          message: 'Transação excluída'
        })
        : res.status(404)
          .json({ message: 'Não encontrado' })))
      .catch((err) => res.status(500).json({ error: err.message }))
  }
}

export default TransactionController
