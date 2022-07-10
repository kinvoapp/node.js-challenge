import { CreateTransactionUseCase } from "../app/useCases/createTransactionUseCase"
import { DeleteTransactionUseCase } from "../app/useCases/deleteTransactionUseCase"
import { GetBalanceUseCase } from "../app/useCases/getBalanceUseCase"
import { GetTransactionUseCase } from "../app/useCases/getTransactionsUseCase"
import { ListTransactionUseCase } from "../app/useCases/listTransactionUseCase"
import { UpdateTransactionUseCase } from "../app/useCases/updateTransactionUseCase"
import { MemoryRepositoryFactory } from "../factories/MemoryRepositoryFactory"
import { CreateTransactionController } from "./http/controllers/CreateTransaction"
import { DeleteTransactionController } from "./http/controllers/DeleteTransaction"
import { GetBalanceController } from "./http/controllers/GetBalance"
import { GetTransactionController } from "./http/controllers/GetTransaction"
import { ListTransactionsController } from "./http/controllers/ListTransactions"
import { UpdateTransactionController } from "./http/controllers/UpdateTransaction"

const repositoryFactory = new MemoryRepositoryFactory()
const transactionRepository = repositoryFactory.createTransactionRepository()

const getBalanceUseCase = new GetBalanceUseCase(transactionRepository)
const getBalanceController = new GetBalanceController(getBalanceUseCase)

const listTransactionUseCase = new ListTransactionUseCase(transactionRepository)
const listTransactionsController = new ListTransactionsController(listTransactionUseCase)

const getTransactionUseCase = new GetTransactionUseCase(transactionRepository)
const getTransactionController = new GetTransactionController(getTransactionUseCase)

const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository)
const createTransactionController = new CreateTransactionController(createTransactionUseCase)

const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository)
const updateTransactionController = new UpdateTransactionController(updateTransactionUseCase)

const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository)
const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCase)

export {
  getTransactionController,
  createTransactionController,
  listTransactionsController,
  deleteTransactionController,
  updateTransactionController,
  getBalanceController,
}
