import { TransactionRepository } from "@/internal/interface/repository/transaction";

export default function transactionRepositoryFactory(
  repositoryMethods: TransactionRepository,
): TransactionRepository {
  return {
    create: repositoryMethods.create,
    find: repositoryMethods.find,
    findCount: repositoryMethods.findCount,
    findOne: repositoryMethods.findOne,
    update: repositoryMethods.update,
    delete: repositoryMethods.delete,
  };
}
