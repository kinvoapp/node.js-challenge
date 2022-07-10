import { TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'
import { AuthenticationError } from '@/domain/entities/errors'

export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}

export namespace Decrypt {
  export type Input = { value: string }
  export type Output = { key: string }
}
export interface Decrypt {
  decrypt: (params: Decrypt.Input) => Promise<Decrypt.Output>
}

// type Output = { accessToken: string }
type Input = { email: string, password: string }
export type Login = (params: Input) => Promise<void>
type Setup = (userAccountRepo: LoadUserAccountRepository, crypto: Decrypt, token: TokenGenerator) => Login

export const loginSeup: Setup = (userAccountRepo, crypto, token) => async (params) => {
  const result = await userAccountRepo.load({ email: params.email })
  if (result !== undefined) {
    const { key } = await crypto.decrypt({ value: result.password })
    if (key !== params.password) {
      throw new InvalidParamError('password')
    }
  } else {
    throw new AuthenticationError()
  }
}

describe('Login', () => {
  let email: string
  let password: string
  let crypto: MockProxy<Decrypt>
  let token: MockProxy<TokenGenerator>
  let sut: Login
  let userAccountRepo: MockProxy<LoadUserAccountRepository>

  beforeAll(() => {
    email = 'any_email'
    password = 'any_password'
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_emal',
      password: 'any_password'
    })
    crypto = mock()
    crypto.decrypt.mockResolvedValue({ key: password })
    token = mock()
  })

  beforeEach(() => {
    sut = loginSeup(userAccountRepo, crypto, token)
  })

  it('should  call load with correct input', async () => {
    await sut({ email, password })
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if load returns undefined', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)
    const promise = sut({ email, password })
    await expect(promise).rejects.toThrow(new Error('Athentication failed'))
  })

  it('should call decrypter with correct input', async () => {
    await sut({ email, password })
    expect(crypto.decrypt).toHaveBeenCalledWith({ value: password })
    expect(crypto.decrypt).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if the password dont match', async () => {
    crypto.decrypt.mockResolvedValueOnce({ key: 'any_key' })
    const promise = sut({ email, password })
    await expect(promise).rejects.toThrow(new Error('Invalid param: password'))
  })
})
