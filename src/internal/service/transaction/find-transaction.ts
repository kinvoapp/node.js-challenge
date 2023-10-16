import { FindTransactionDto } from '@/internal/dto/transaction'
import InvalidDataError from '@/internal/error/invalid-data'
import { TransactionRepository } from '@/internal/interface/repository/transaction'
import { validateTransaction } from '@/internal/validation/transaction'
import createPaginationResponse from '@/utils/pagination/pagination'
import { transaction } from '@prisma/client'

export default async function findTransaction(
  repository: TransactionRepository,
  data: FindTransactionDto
) {
  const isValid = validateTransaction.findData(data)
  if (!isValid) throw new InvalidDataError()

  const [count, transactions] = await Promise.all([
    repository.findCount({
      initialDate: data.initialDate,
      finalDate: data.finalDate,
    }),
    repository.find(data),
  ])

  return createPaginationResponse<transaction>({
    count,
    limit: data.limit!,
    offset: data.offset!,
    items: transactions,
  })
}
