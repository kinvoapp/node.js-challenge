import { TransactionRepository } from "@/factory/repository/transaction";
import { UpdateTransactionDto } from "@/internal/dto/transaction";
import { validateTransaction } from "@/internal/validation/transaction";
import { GraphQLError } from "graphql";

export default async function updateTransaction(
  repository: TransactionRepository,
  id: string,
  data: UpdateTransactionDto,
) {
  const isValid = validateTransaction.updateData(id, data);
  if (!isValid)
    throw new GraphQLError("invalid data provided", {
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

  repository.update(id, data);
}
