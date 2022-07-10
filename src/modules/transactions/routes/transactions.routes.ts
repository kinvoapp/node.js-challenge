import { Router } from "express";
import { TransactionsController } from "../controllers/TransactionsController";



const transactionsRoutes = Router()
const transactionsController = new TransactionsController()


transactionsRoutes.post('/', transactionsController.create)
transactionsRoutes.get('/:user_id', transactionsController.listTransactions)


export {transactionsRoutes}