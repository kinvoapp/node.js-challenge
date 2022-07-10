import { TransactionsRepository } from '../TransactionsRepository'
import { Transaction } from '../../domain/transaction'
import { prisma } from '../../../../infra/prisma/client'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(transaction: Transaction): Promise<void> {
    await prisma.transaction.create({ data: transaction.props })
  }

  async save(transaction: Transaction): Promise<void> {
    await prisma.transaction.update({
      where: { id: transaction.props.id },
      data: transaction.props
    })
  }
}
