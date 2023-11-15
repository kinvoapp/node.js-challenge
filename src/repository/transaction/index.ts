import createTransaction from './create-transaction'
import findTransaction from './find-transaction'
import updateTransaction from './update-transaction'
import deleteTransaction from './delete-transaction'
import transactionRepositoryFactory from '@/factory/repository/transaction'
import findOneTransaction from './find-one-transaction'
import findCount from './find-count-transaction'

export const transactionRepository = transactionRepositoryFactory({
  create: createTransaction,
  find: findTransaction,
  findCount,
  findOne: findOneTransaction,
  update: updateTransaction,
  delete: deleteTransaction,
})
