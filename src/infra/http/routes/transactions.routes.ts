import { Router } from 'express'
import { createTransactionFactory } from '../factories/controllers/CreateTransactionFactory'
import { updateTransactionFactory } from '../factories/controllers/UpdateTransactionFactory'

const transactionsRouter = Router()

transactionsRouter.post('/', createTransactionFactory)
transactionsRouter.put('/', updateTransactionFactory)

export { transactionsRouter }
