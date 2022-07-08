import bcrypt from 'bcrypt'

jest.mock('bcrypt')

type Input = { value: string }
type Output = string

export class BcryptHandler {
  constructor (private readonly salt: number) { }
  async encrypt (params: Input): Promise<Output> {
    const hashedPassword = await bcrypt.hash(params.value, this.salt)
    return hashedPassword
  }
}

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
    sut = new BcryptHandler(salt)
  })

  it('should call hash with correct input', async () => {
    await sut.encrypt({ value: 'any_value' })
    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt)
    expect(fakeBcrypt.hash).toBeCalledTimes(1)
  })

  it('should return a passwordHashed on success', async () => {
    const passwordHashed = await sut.encrypt({ value: 'any_value' })
    expect(passwordHashed).toBe(hashedPassword)
  })

  it('should rethrow if hash throws', async () => {
    fakeBcrypt.hash.mockImplementationOnce(() => { throw new Error('token_error') })
    const promise = sut.encrypt({ value: 'any_value' })
    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
