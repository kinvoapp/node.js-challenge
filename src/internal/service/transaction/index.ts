import findTransaction from './find-transaction'
import createTransaction from './create-transaction'
import updateTransaction from './update-transaction'
import deleteTransaction from './delete-transaction'

const transactionService = {
  find: findTransaction,
  create: createTransaction,
  update: updateTransaction,
  delete: deleteTransaction,
}
export default transactionService
