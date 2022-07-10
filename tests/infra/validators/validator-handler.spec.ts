import { ValidatorHandler } from '@/infra/validators'
import validator from 'validator'

jest.mock('validator')

describe('ValidatorHandler', () => {
  let sut: ValidatorHandler
  let fakeValidator: jest.Mocked<typeof validator>

  beforeAll(() => {
    fakeValidator = validator as jest.Mocked<typeof validator>
    fakeValidator.isEmail.mockImplementation(() => true)
  })

  beforeEach(() => {
    sut = new ValidatorHandler()
  })

  it('should call isValid with correct input', async () => {
    await sut.validate({ value: 'any_email' })
    expect(fakeValidator.isEmail).toHaveBeenCalledWith('any_email')
    expect(fakeValidator.isEmail).toBeCalledTimes(1)
  })

  it('should return true if email is valid', async () => {
    const result = await sut.validate({ value: 'valid_email' })
    expect(result).toEqual(true)
  })

  it('should return false if email is not valid', async () => {
    fakeValidator.isEmail.mockImplementationOnce(() => false)
    const result = await sut.validate({ value: 'invalid_email' })
    expect(result).toEqual(false)
  })

  it('should rethrow if validate throws', async () => {
    fakeValidator.isEmail.mockImplementationOnce(() => { throw new Error('email_error') })
    const promise = sut.validate({ value: 'invalid_email' })
    await expect(promise).rejects.toThrow(new Error('email_error'))
  })
})
