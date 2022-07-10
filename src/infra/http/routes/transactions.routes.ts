import { Router } from 'express'
import { createTransactionFactory } from '../factories/controllers/CreateTransactionFactory'
import { deleteTransactionFactory } from '../factories/controllers/DeleteTransactionFactory'
import { updateTransactionFactory } from '../factories/controllers/UpdateTransactionFactory'

const transactionsRouter = Router()

transactionsRouter.post('/', createTransactionFactory)
transactionsRouter.put('/', updateTransactionFactory)
transactionsRouter.delete('/', deleteTransactionFactory)

export { transactionsRouter }
