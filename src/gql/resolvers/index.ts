import {
  CreateTransactionDto,
  FindTransactionDto,
  UpdateTransactionDto,
} from "@/internal/dto/transaction";
import transactionService from "@/internal/service/transaction";
import { transactionRepository } from "@/repository/transaction";
import Void from "../custom-types/void";

const resolvers = {
  Void: Void,
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
      transactionService.update(transactionRepository, id, data);
      return Void;
    },
    deleteTransaction: (_: any, { id }: { id: string }) => {
      transactionService.delete(transactionRepository, id);
      return Void;
    },
  },
};

export default resolvers;
