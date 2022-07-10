import bcrypt from 'bcrypt'
import { BcryptHandler } from '@/infra/crypto'

jest.mock('bcrypt')

describe('BcryptHandler', () => {
  let salt: number
  let hashedPassword: string
  let sut: BcryptHandler
  let fakeBcrypt: jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    salt = 12
    hashedPassword = 'any_hashed_passoword'
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => hashedPassword)
    fakeBcrypt.compare.mockImplementation(() => true)
    sut = new BcryptHandler(salt)
  })

  it('should call hash with correct input', async () => {
    await sut.encrypt({ value: 'any_value' })
    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt)
    expect(fakeBcrypt.hash).toBeCalledTimes(1)
  })

  it('should return a passwordHashed on success', async () => {
    const passwordHashed = await sut.encrypt({ value: 'any_value' })
    expect(passwordHashed).toEqual({ key: hashedPassword })
  })

  it('should rethrow if hash throws', async () => {
    fakeBcrypt.hash.mockImplementationOnce(() => { throw new Error('token_error') })
    const promise = sut.encrypt({ value: 'any_value' })
    await expect(promise).rejects.toThrow(new Error('token_error'))
  })

  it('should call Compare with correct input', async () => {
    await sut.compare({ value: 'any_value', valueToCompare: 'any_value' })
    expect(fakeBcrypt.compare).toHaveBeenCalledWith('any_value', 'any_value')
    expect(fakeBcrypt.compare).toBeCalledTimes(1)
  })

  it('should return true on secuess', async () => {
    const isValid = await sut.compare({ value: 'any_value', valueToCompare: 'any_value' })
    expect(isValid).toBe(true)
  })

  it('should return false on secuess', async () => {
    fakeBcrypt.compare.mockImplementationOnce(() => false)
    const isValid = await sut.compare({ value: 'any_value', valueToCompare: 'any_value_diferent' })
    expect(isValid).toBe(false)
  })
})
