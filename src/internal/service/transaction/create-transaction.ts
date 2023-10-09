import { TransactionRepository } from "@/factory/repository/transaction";
import { CreateTransactionDto } from "@/internal/dto/transaction";
import { validateTransaction } from "@/internal/validation/transaction";
import { GraphQLError } from "graphql";

export default async function createTransaction(
  repository: TransactionRepository,
  data: CreateTransactionDto,
) {
  const isValid = validateTransaction.createData(data);
  if (!isValid)
    throw new GraphQLError("invalid data provided", {
      extensions: {
        code: "Bad Request".toUpperCase(),
        http: { status: 400 },
      },
    });

  return repository.create(data);
}
