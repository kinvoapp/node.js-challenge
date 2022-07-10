import { Router } from "express";
import { TransactionsController } from "../controllers/TransactionsController";
import isAuthenticated from '../../../middlewares/isAuthenticated'


const transactionsRoutes = Router()
const transactionsController = new TransactionsController()


transactionsRoutes.post('/', isAuthenticated, transactionsController.create)
transactionsRoutes.get('/', isAuthenticated, transactionsController.listTransactions)
transactionsRoutes.patch('/:transaction_id', isAuthenticated, transactionsController.update)
transactionsRoutes.delete('/:transaction_id', isAuthenticated, transactionsController.delete)


export {transactionsRoutes}