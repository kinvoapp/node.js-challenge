import findTransaction from '../find-transaction'
import {describe, expect, it} from '@jest/globals'
import transactionRepositoryMock from './mock/transaction-repository-mock'

describe('find transaction service', () => {
  it('should throw an error for invalid initial date', () => {
    expect(
      findTransaction(transactionRepositoryMock, {initialDate: 'invalid'})
    ).rejects.toThrowError()
  })

  it('should throw an error for invalid final date', () => {
    expect(
      findTransaction(transactionRepositoryMock, {finalDate: 'invalid'})
    ).rejects.toThrowError()
  })

  it('should return a empty array with no search params', () => {
    expect(findTransaction(transactionRepositoryMock)).resolves.toStrictEqual({
      count: 0,
      items: [],
      next: null,
      previous: null,
    })
  })

  it('should return a empty array with valid initial date', () => {
    expect(
      findTransaction(transactionRepositoryMock, {initialDate: '2000-01-01'})
    ).resolves.toStrictEqual({
      count: 0,
      items: [],
      next: null,
      previous: null,
    })
  })

  it('should return a empty array with valid final date', () => {
    expect(
      findTransaction(transactionRepositoryMock, {finalDate: '2000-01-01'})
    ).resolves.toStrictEqual({
      count: 0,
      items: [],
      next: null,
      previous: null,
    })
  })
})
