import { Router } from "express";
import { createTransaction } from "@controllers/transactions/createTransactionController";
import { deleteTransaction } from "@controllers/transactions/deleteTransactionController";
import { updateTransaction } from "@controllers/transactions/updateTransactionController";
import { listTransactions } from "@controllers/transactions/listTransactionController";
import { getBalance } from "@controllers/transactions/sumTransactionsController";
import { filterByDate } from "@controllers/filters/filterByDateController";
import { signUp } from "@controllers/users/createUserController";
import { signIn } from "@controllers/authentication/authenticationController";
import { validateToken } from "../middlewares/validateToken";

const router = Router()

//Users Routes
router.post("/user", signUp)
router.post("/user/authentication", signIn)


//Transactions Routes
router.use(validateToken)
router.get('/balance', getBalance)
router.get('/transactions/:id', listTransactions)

router.post('/transactions', createTransaction)
router.patch('/transactions/:id', updateTransaction)
router.delete('/transactions/:id', deleteTransaction)
router.get('/filter/transactions', filterByDate)
//Filter Routes


export default router