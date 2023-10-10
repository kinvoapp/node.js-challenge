import { TransactionRepository } from "@/factory/repository/transaction";
import { UpdateTransactionDto } from "@/internal/dto/transaction";
import InvalidDataError from "@/internal/error/invalid-data";
import { validateTransaction } from "@/internal/validation/transaction";

export default async function updateTransaction(
  repository: TransactionRepository,
  id: string,
  data: UpdateTransactionDto,
) {
  const isValid = validateTransaction.updateData(id, data);
  if (!isValid) return new InvalidDataError();

  const isInDb = (await repository.findOne(id)) !== null;
  if (!isInDb)
    return new InvalidDataError(`transaction with id: ${id}, doesn't exist`);

  return repository.update(id, data);
}
