import { describe, expect, it } from '@jest/globals'
import updateData from '../validate-update-data'

describe('validate update user data', () => {
  it('should return false for invalid data', () => {
    const isValid = updateData('invalid', {
      name: 'invalid',
      email: 'invalid',
    })

    expect(isValid).toBe(false)
  })

  it('should return true for valid data', () => {
    const isValid = updateData('c6a26ac0-4fc1-4fbb-8de4-835b21e59e00', {
      name: 'valid name',
      email: 'valid@email.com',
    })

    expect(isValid).toBe(true)
  })

  it('should return true for no data', () => {
    const isValid = updateData('c6a26ac0-4fc1-4fbb-8de4-835b21e59e00', {})

    expect(isValid).toBe(true)
  })
})
