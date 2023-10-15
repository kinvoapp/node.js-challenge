import transactionRepositoryFactory from '@/factory/repository/transaction'
import {transaction} from '@prisma/client'
import {Decimal} from '@prisma/client/runtime/library'

export const transactionMock: transaction = {
  id: '292f3665-46fd-4060-ba5d-2ec9c990aa0c',
  amount: new Decimal(100),
  type: 'IN',
  created_at: new Date(1),
  updated_at: new Date(1),
  userId: 'c6a26ac0-4fc1-4fbb-8de4-835b21e59e00',
}

const transactionRepositoryMock = transactionRepositoryFactory({
  async create(data) {
    return {
      id: 'valid id',
      amount: new Decimal(data.amount),
      type: data.type,
      created_at: new Date(1),
      updated_at: new Date(1),
      userId: 'c6a26ac0-4fc1-4fbb-8de4-835b21e59e00',
    }
  },
  async find(_data) {
    return []
  },
  async findCount(_data) {
    return 0
  },
  async findOne(id) {
    return id === '292f3665-46fd-4060-ba5d-2ec9c990aa0c' ? transactionMock : null
  },
  async update(_id, _data) {
    return transactionMock
  },
  async delete(_id) {
    return transactionMock
  },
})

export default transactionRepositoryMock
