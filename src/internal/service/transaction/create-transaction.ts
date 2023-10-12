import { CreateTransactionDto } from "@/internal/dto/transaction";
import InvalidDataError from "@/internal/error/invalid-data";
import { TransactionRepository } from "@/internal/interface/repository/transaction";
import { validateTransaction } from "@/internal/validation/transaction";

export default async function createTransaction(
  repository: TransactionRepository,
  data: CreateTransactionDto,
) {
  const isValid = validateTransaction.createData(data);
  if (!isValid) return new InvalidDataError();

  return repository.create(data);
}
