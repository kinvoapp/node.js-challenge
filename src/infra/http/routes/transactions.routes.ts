import { Router } from 'express'
import { createTransactionFactory } from '../factories/controllers/CreateTransactionFactory'
import { deleteTransactionFactory } from '../factories/controllers/DeleteTransactionFactory'
import { listTransactionFactory } from '../factories/controllers/ListTransactionFactory'
import { updateTransactionFactory } from '../factories/controllers/UpdateTransactionFactory'

const transactionsRouter = Router()

transactionsRouter.post('/', createTransactionFactory)
transactionsRouter.put('/', updateTransactionFactory)
transactionsRouter.get('/', listTransactionFactory)
transactionsRouter.delete('/', deleteTransactionFactory)

export { transactionsRouter }
