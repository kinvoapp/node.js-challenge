import {describe, expect, it} from '@jest/globals'
import createPaginationResponse from '../pagination'
import {transactionsMock} from './mock/data'

describe('create pagination response', () => {
  it('should return next property different than null', () => {
    const response = createPaginationResponse({
      count: transactionsMock.length,
      limit: 10,
      offset: 0,
      items: transactionsMock,
    })

    expect(response.next).not.toBeNull()
    expect(response.previous).toBeNull()
  })

  it('should return previous different than null', () => {
    const response = createPaginationResponse({
      count: transactionsMock.length,
      limit: 10,
      offset: 20,
      items: transactionsMock,
    })

    expect(response.next).toBeNull()
    expect(response.previous).not.toBeNull()
  })
  it('should return different offset and limit on previous and next properties', () => {
    const response = createPaginationResponse({
      count: transactionsMock.length,
      limit: 20,
      offset: 5,
      items: transactionsMock,
    })

    expect(response.previous?.limit).toBe(5)
    expect(response.next?.limit).toBe(5)
  })
})
