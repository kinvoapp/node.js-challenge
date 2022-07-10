import { Router } from "express"
import {
  createTransactionController,
  getTransactionController,
  listTransactionsController,
  deleteTransactionController,
  updateTransactionController,
} from "../../main"

const transactionRoute = Router()

transactionRoute.get("/transactions", async (req, res) => await listTransactionsController.handle(req, res))
transactionRoute.get("/transactions/:uid", async (req, res) => await getTransactionController.handle(req, res))
transactionRoute.post("/transactions", async (req, res) => await createTransactionController.handle(req, res))
transactionRoute.put("/transactions/:uid", async (req, res) => await updateTransactionController.handle(req, res))
transactionRoute.delete("/transactions/:uid", async (req, res) => await deleteTransactionController.handle(req, res))

export { transactionRoute }
