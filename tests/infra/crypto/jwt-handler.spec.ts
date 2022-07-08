import { TokenGenerator } from '@/domain/contracts/crypto'
import jwt, { sign } from 'jsonwebtoken'

jest.mock('jsonwebtoken')

export class JwtTokenHandler {
  constructor (private readonly secret: string) { }
  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret)
  }
}

describe('JwtTokenHandler', () => {
  let secret: string
  let sut: JwtTokenHandler
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeEach(() => {
    secret = 'any_secret'
    sut = new JwtTokenHandler('any_secret')
  })

  describe('generateToken', () => {
    let key: string
    let token: string
    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      fakeJwt = jwt as jest.Mocked<typeof jwt>
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call sing with corecct input', async () => {
      await sut.generate({ key })
      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret)
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should returna accessToken on success', async () => {
      const generatedToken = await sut.generate({ key })
      expect(generatedToken).toBe('any_token')
    })

    it('should rethrow if sing throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })
      const promise = sut.generate({ key })
      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })
})
