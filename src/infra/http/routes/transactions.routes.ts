import { Router } from 'express'
import { createTransactionFactory } from '../factories/controllers/CreateTransactionFactory'

const transactionsRouter = Router()

transactionsRouter.post('/', createTransactionFactory)

export { transactionsRouter }
