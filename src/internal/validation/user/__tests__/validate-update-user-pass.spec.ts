import { describe, expect, it } from '@jest/globals'
import updatePass from '../validate-update-user-pass'

describe('validate update user password', () => {
  it('should return false for invalid data', () => {
    const isValid = updatePass({
      oldPassword: 'invalid',
      newPassword: 'invalid1',
      confirmNewPassword: 'invalid',
    })

    expect(isValid).toBe(false)
  })

  it('should return true for valid data', () => {
    const isValid = updatePass({
      oldPassword: 'valid',
      newPassword: 'valid@Password1',
      confirmNewPassword: 'valid@Password1',
    })

    expect(isValid).toBe(true)
  })
})
