import { Router } from "express";
import { createTransaction } from "@controllers/transactions/createTransaction/createTransactionController";
import { deleteTransaction } from "@controllers/transactions/deleteTransaction/deleteTransactionController";
import { updateTransaction } from "@controllers/transactions/updateTransaction/updateTransactionController";

import { getBalance } from "@controllers/transactions/getBalance";
import { filterByDate } from "@controllers/filter/filterByDate";
import { listTransactions } from "@controllers/transactions/listTransactions/listTransactionController";

const router = Router()

//Users Routes



//Transactions Routes
router.get('/user/balance', getBalance)
router.get('/transactions/:page', listTransactions)

router.post('/transactions', createTransaction)
router.put('/transactions/:id', updateTransaction)
router.delete('/transactions/:id', deleteTransaction)

//Filter Routes
router.post('/transactions/filterByDate', filterByDate)

export default router