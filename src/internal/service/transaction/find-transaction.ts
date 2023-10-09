import { TransactionRepository } from "@/factory/repository/transaction";
import { FindTransactionDto } from "@/internal/dto/transaction";
import { validateTransaction } from "@/internal/validation/transaction";
import { GraphQLError } from "graphql";

export default async function findTransaction(
  repository: TransactionRepository,
  data: FindTransactionDto = {},
) {
  if (data.initialDate || data.finalDate) {
    const isValid = validateTransaction.findData(data);
    if (!isValid)
      throw new GraphQLError("invalid data provided", {
        extensions: {
          code: "Bad Request".toUpperCase(),
          http: { status: 400 },
        },
      });
  }

  const transactions = await repository.find(data);
  return transactions;
}
