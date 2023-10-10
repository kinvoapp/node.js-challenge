import { TransactionRepository } from "@/factory/repository/transaction";
import InvalidDataError from "@/internal/error/invalid-data";
import { validateTransaction } from "@/internal/validation/transaction";

export default async function deleteTransaction(
  repository: TransactionRepository,
  id: string,
) {
  const isValid = validateTransaction.deleteData(id);
  if (!isValid) return new InvalidDataError();
  const isInDb = (await repository.findOne(id)) !== null;
  if (!isInDb)
    return new InvalidDataError(`transaction with id: ${id}, doesn't exist`);

  return repository.delete(id);
}
