import { Router } from "express";
import { TransactionsController } from "../controllers/TransactionsController";



const transactionsRoutes = Router()
const transactionsController = new TransactionsController()


transactionsRoutes.post('/', transactionsController.create)
transactionsRoutes.get('/:user_id', transactionsController.listTransactions)
transactionsRoutes.patch('/:transaction_id', transactionsController.update)
transactionsRoutes.delete('/:transaction_id', transactionsController.delete)


export {transactionsRoutes}