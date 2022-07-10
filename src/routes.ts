import { Router } from 'express'
import TransactionController from './controllers/TransactionController'

const routes = Router()

routes.get('/transactions', TransactionController.index)
routes.get('/transactions/:id', TransactionController.findById)
routes.post('/transactions/', TransactionController.store)
routes.put('/transactions/:id', TransactionController.update)
routes.delete('/transactions/:id', TransactionController.delete)

export default routes
