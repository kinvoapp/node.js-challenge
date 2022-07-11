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

  async retrieve(): Promise<Transaction[]> {
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

  async show(page: number): Promise<Transaction[]> {
    const res = await prisma.transaction.findMany({
      skip: page <= 1 ? 0 : (page - 1) * 5,
      take: 5,
      orderBy: { updated_at: 'asc' }
    })
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

  async showWithDate(initialDate: string, finalDate: string, page: number): Promise<Transaction[]> {
    const res = await prisma.transaction.findMany({
      where: {
        updated_at: { gte: new Date(initialDate), lte: new Date(finalDate + 'T23:59:59.000Z') }
      },
      skip: page <= 1 ? 0 : (page - 1) * 5,
      take: 5,
      orderBy: { updated_at: 'asc' }
    })
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
