import { Encrypter, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'

type Output = { accessToken: string }
type Input = { email: string, password: string }
export type Login = (params: Input) => Promise<Output>
type Setup = (userAccountRepo: LoadUserAccountRepository, crypto: Encrypter, token: TokenGenerator) => Login

export const loginSeup: Setup = (userAccountRepo, crypto, token) => async (params) => {
  await userAccountRepo.load({ email: params.email })
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
    userAccountRepo.load.mockResolvedValue(undefined)
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
})
