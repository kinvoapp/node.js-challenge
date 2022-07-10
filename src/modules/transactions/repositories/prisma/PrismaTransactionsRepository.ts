import { TransactionsRepository } from '../TransactionsRepository'
import { Transaction, TransactionType } from '../../domain/transaction'
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

  async delete(id: string): Promise<void> {
    await prisma.transaction.delete({ where: { id } })
  }

  async show(): Promise<Transaction[]> {
    const res = await prisma.transaction.findMany()
    const transactions = res.map(transaction =>
      Transaction.create({
        id: transaction.id,
        value: transaction.value,
        type: transaction.type === 'Deposit' ? TransactionType.Deposit : TransactionType.Withdraw,
        description: transaction.description || ''
      })
    )
    return transactions
  }
}
