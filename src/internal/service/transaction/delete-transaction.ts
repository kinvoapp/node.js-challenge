import { TransactionRepository } from "@/factory/repository/transaction";
import { validateTransaction } from "@/internal/validation/transaction";
import { GraphQLError } from "graphql";

export default async function deleteTransaction(
  repository: TransactionRepository,
  id: string,
) {
  const isValid = validateTransaction.deleteData(id);
  if (!isValid)
    throw new GraphQLError("invalid id", {
      extensions: {
        code: "Bad Request".toUpperCase(),
        http: { status: 400 },
      },
    });
  const isInDb = (await repository.findOne(id)) !== null;
  if (!isInDb)
    throw new GraphQLError(`transaction with id: ${id}, doesn't exist`, {
      extensions: {
        code: "Bad Request".toUpperCase(),
        http: { status: 400 },
      },
    });

  repository.delete(id);
}
