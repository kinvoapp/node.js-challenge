import {
  CreateTransactionDto,
  FindTransactionDto,
  UpdateTransactionDto,
} from '@/internal/dto/transaction'
import { CreateUserDto, FindUserDto } from '@/internal/dto/user'
import transactionService from '@/internal/service/transaction'
import { userService } from '@/internal/service/user'
import { transactionRepository } from '@/repository/transaction'
import { userRepository } from '@/repository/user'
import { transaction, user } from '@prisma/client'

const resolvers = {
  TransactionType: {
    IN: 'IN',
    OUT: 'OUT',
  },
  User: {
    transactions: async (parent: user) => {
      const items = await transactionService.findByUserId(transactionRepository, parent.id)
      return items
    },
    balance: (parent: user) => {
      return userService.balanceUser(userRepository, parent.id)
    },
  },
  Transaction: {
    user: (parent: transaction) => {
      return userService.findOneUser(userRepository, { id: parent.userId })
    },
  },
  Query: {
    transactions: (_: any, { data = {} }: { data: FindTransactionDto }) => {
      let limit = 20
      let offset = 0
      offset = data?.offset ?? offset
      limit = data?.limit ?? limit

      return transactionService.find(transactionRepository, {
        ...data,
        limit,
        offset,
      })
    },
    users: (_: any, { data = {} }: { data: FindUserDto }) => {
      let limit = 20
      let offset = 0
      offset = data?.offset ?? offset
      limit = data?.limit ?? limit

      return userService.findUser(userRepository, {
        ...data,
        limit,
        offset,
      })
    },
  },
  Mutation: {
    newTransaction: (_: any, { data }: { data: CreateTransactionDto }) => {
      return transactionService.create(transactionRepository, data)
    },
    updateTransaction: (_: any, { id, data }: { id: string; data: UpdateTransactionDto }) => {
      return transactionService.update(transactionRepository, id, data)
    },
    deleteTransaction: (_: any, { id }: { id: string }) => {
      return transactionService.delete(transactionRepository, id)
    },
    newUser: (_: any, { data }: { data: CreateUserDto }) => {
      return userService.createUser(userRepository, data)
    },
  },
}

export default resolvers
