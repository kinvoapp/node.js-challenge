import { Prisma, Transaction } from "@prisma/client";

export function buildTransactionSelect() {
  return {
    id: true,
    accountId: true,
    amount: true,
    description: true,
    type: true,
    createdAt: true,
    updatedAt: true,
  };
}
