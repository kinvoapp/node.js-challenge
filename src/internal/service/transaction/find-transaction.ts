import { TransactionRepository } from "@/factory/repository/transaction";
import { FindTransactionDto } from "@/internal/dto/transaction";
import InvalidDataError from "@/internal/error/invalid-data";
import { validateTransaction } from "@/internal/validation/transaction";

export default async function findTransaction(
  repository: TransactionRepository,
  data: FindTransactionDto = {},
) {
  if (data.initialDate || data.finalDate) {
    const isValid = validateTransaction.findData(data);
    if (!isValid) return new InvalidDataError();
  }

  const transactions = await repository.find(data);
  return transactions;
}
