import {
  CreateTransactionDto,
  FindTransactionDto,
  UpdateTransactionDto,
} from "@/internal/dto/transaction";
import transactionService from "@/internal/service/transaction";
import { transactionRepository } from "@/repository/transaction";

const resolvers = {
  TransactionType: {
    IN: "IN",
    OUT: "OUT",
  },
  Query: {
    transactions: (_: any, { data }: { data: FindTransactionDto }) => {
      return transactionService.find(transactionRepository, data);
    },
  },
  Mutation: {
    newTransaction: (_: any, { data }: { data: CreateTransactionDto }) => {
      return transactionService.create(transactionRepository, data);
    },
    updateTransaction: (
      _: any,
      { id, data }: { id: string; data: UpdateTransactionDto },
    ) => {
      return transactionService.update(transactionRepository, id, data);
    },
    deleteTransaction: (_: any, { id }: { id: string }) => {
      return transactionService.delete(transactionRepository, id);
    },
  },
};

export default resolvers;
