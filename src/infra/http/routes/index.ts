import { Router } from 'express'
import { transactionsRouter } from './transactions.routes'

const router = Router()

router.use('/transactions', transactionsRouter)

export { router }
