import { TransactionsRepository } from '../TransactionsRepository'
import { Transaction } from '../../domain/transaction'
import { prisma } from '../../../../infra/prisma/client'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(transaction: Transaction): Promise<void> {
    await prisma.transaction.create({ data: transaction.props })
  }
}
