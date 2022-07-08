import bcrypt from 'bcrypt'

jest.mock('bcrypt')

type Input = { value: string }

export class BcryptHandler {
  constructor (private readonly salt: number) { }
  async encrypt (params: Input): Promise<void> {
    await bcrypt.hash(params.value, this.salt)
  }
}

describe('BcryptHandler', () => {
  let salt: number
  let sut: BcryptHandler
  let fakeBcrypt: jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    salt = 12
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    sut = new BcryptHandler(salt)
  })

  it('should call hash with correct input', async () => {
    await sut.encrypt({ value: 'any_value' })
    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt)
    expect(fakeBcrypt.hash).toBeCalledTimes(1)
  })
})
