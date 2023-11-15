import { describe, expect, it } from '@jest/globals'
import transactionRepositoryMock, { transactionMock } from './mock/transaction-repository-mock'
import deleteTransaction from '../delete-transaction'
import { randomUUID } from 'crypto'

describe('update transaction service', () => {
  it('should throw an error for a invalid uuid', () => {
    expect(deleteTransaction(transactionRepositoryMock, 'invalid uuid')).rejects.toThrowError()
  })

  it("should throw an error for a id that doesn't exists in db", () => {
    expect(deleteTransaction(transactionRepositoryMock, randomUUID())).rejects.toThrowError()
  })

  it('should return nothing when it receives valid data', () => {
    expect(
      deleteTransaction(transactionRepositoryMock, '292f3665-46fd-4060-ba5d-2ec9c990aa0c')
    ).resolves.toStrictEqual(transactionMock)
  })
})
