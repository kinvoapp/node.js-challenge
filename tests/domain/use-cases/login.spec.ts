import { Comparator, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'
import { Login, loginSeup } from '@/domain/use-cases/login'

describe('Login', () => {
  let email: string
  let password: string
  let crypto: MockProxy<Comparator>
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
    crypto.compare.mockResolvedValue(true)
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

  it('should rethrow if load returns undefined', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)
    const promise = sut({ email, password })
    await expect(promise).rejects.toThrow(new Error('Athentication failed'))
  })

  it('should call Comparatorer with correct input', async () => {
    await sut({ email, password })
    expect(crypto.compare).toHaveBeenCalledWith({ value: password, valueToComoare: 'any_password' })
    expect(crypto.compare).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if the password dont match', async () => {
    crypto.compare.mockResolvedValueOnce(false)
    const promise = sut({ email, password })
    await expect(promise).rejects.toThrow(new Error('Invalid param: password'))
  })

  it('should  call token generator correct input', async () => {
    await sut({ email, password })
    expect(token.generate).toHaveBeenCalledWith({ key: 'any_user_id' })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('should  return an accessToken on success', async () => {
    const aceestoken = await sut({ email, password })
    expect(aceestoken).toEqual({ accessToken: 'any_token' })
  })
})
