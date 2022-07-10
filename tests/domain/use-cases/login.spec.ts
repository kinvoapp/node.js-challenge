import { Encrypter, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'
import { AuthenticationError } from '@/domain/entities/errors'

type Output = { accessToken: string }
type Input = { email: string, password: string }
export type Login = (params: Input) => Promise<Output>
type Setup = (userAccountRepo: LoadUserAccountRepository, crypto: Encrypter, token: TokenGenerator) => Login

export const loginSeup: Setup = (userAccountRepo, crypto, token) => async (params) => {
  const result = await userAccountRepo.load({ email: params.email })
  if (result === undefined) throw new AuthenticationError()
  return { accessToken: 'gagga' }
}

describe('Login', () => {
  let email: string
  let password: string
  let crypto: MockProxy<Encrypter>
  let token: MockProxy<TokenGenerator>
  let sut: Login
  let userAccountRepo: MockProxy<LoadUserAccountRepository>

  beforeAll(() => {
    email = 'any_emal'
    password = 'any_password'
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue({
      email: 'any_email',
      name: 'any_name',
      id: 'any_id'
    })

    crypto = mock()
    crypto.encrypt.mockResolvedValue({ key: 'any_encrypted_key' })
    token = mock()
    token.generate.mockResolvedValue('any_token')
  })

  beforeEach(() => {
    sut = loginSeup(userAccountRepo, crypto, token)
  })

  it('should  call load with correct input', async () => {
    await sut({ email, password })
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should  trhrow Authentication error if user not found', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))
    const promise = sut({ email, password })
    await expect(promise).rejects.toThrow()
  })
})
