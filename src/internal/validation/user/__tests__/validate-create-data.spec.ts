import {describe, expect, it} from '@jest/globals'
import createData from '../valide-create-data'

describe('validate create data', () => {
  it('should return false for invalid data', () => {
    const isValid = createData({
      name: 'short',
      email: 'invalid',
      password: 'different1',
      confirmPassword: 'different2',
    })

    expect(isValid).toBe(false)
  })

  it('should return true for valid data', () => {
    const isValid = createData({
      name: 'valid name',
      email: 'email@email.com',
      password: 'valid@Password1',
      confirmPassword: 'valid@Password1',
    })

    expect(isValid).toBe(true)
  })
})
