import { Router } from 'express'
import TransactionController from './controllers/TransactionController'

const routes = Router()

routes.get('/transactions', TransactionController.index)

export default routes
