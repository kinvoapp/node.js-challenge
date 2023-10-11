import { TransactionRepository } from "@/factory/repository/transaction";
import { FindTransactionDto } from "@/internal/dto/transaction";
import InvalidDataError from "@/internal/error/invalid-data";
import { validateTransaction } from "@/internal/validation/transaction";
import createPaginationResponse from "@/utils/pagination/pagination";
import { transaction } from "@prisma/client";

export default async function findTransaction(
  repository: TransactionRepository,
  data: FindTransactionDto = {},
) {
  if (data.initialDate || data.finalDate) {
    const isValid = validateTransaction.findData(data);
    if (!isValid) return new InvalidDataError();
  }

  const count = await repository.findCount({
    initialDate: data.initialDate,
    finalDate: data.finalDate,
  });
  const transactions = await repository.find(data);
  return createPaginationResponse<transaction>({
    count,
    limit: data.limit!,
    offset: data.offset!,
    items: transactions,
  });
}
