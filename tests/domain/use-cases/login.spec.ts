import { TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'
import { AuthenticationError } from '@/domain/entities/errors'

export namespace Decrypt {
  export type Input = { value: string }
  export type Output = { key: string }
}
export interface Decrypt {
  decrypt: (params: Decrypt.Input) => Promise<Decrypt.Output>
}

type Output = { accessToken: string }
type Input = { email: string, password: string }
export type Login = (params: Input) => Promise<Output>
type Setup = (userAccountRepo: LoadUserAccountRepository, crypto: Decrypt, token: TokenGenerator) => Login

export const loginSeup: Setup = (userAccountRepo, crypto, token) => async (params) => {
  const result = await userAccountRepo.load({ email: params.email })
  if (result === undefined) throw new AuthenticationError()
  await crypto.decrypt({ value: result.password })
  return { accessToken: 'aaa' }
}

describe('Login', () => {
  let email: string
  let password: string
  let crypto: MockProxy<Decrypt>
  let token: MockProxy<TokenGenerator>
  let sut: Login
  let userAccountRepo: MockProxy<LoadUserAccountRepository>

  beforeAll(() => {
    email = 'any_emal'
    password = 'any_password'
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue({
      id: 'any_id',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    })

    crypto = mock()
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

  it('should call Decrypter with correct input', async () => {
    await sut({ email, password })
    expect(crypto.decrypt).toHaveBeenCalledWith({ value: password })
    expect(crypto.decrypt).toHaveBeenCalledTimes(1)
  })
})
