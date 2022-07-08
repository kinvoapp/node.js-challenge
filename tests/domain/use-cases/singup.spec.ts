import { Encrypter, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/domain/contracts/repos'
import { setupSingup, Singup } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Singup', () => {
  let name: string
  let email: string
  let password: string
  let crypto: MockProxy<Encrypter>
  let token: MockProxy<TokenGenerator>
  let sut: Singup
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveUserAccountRepository>

  beforeAll(() => {
    name = 'any_name'
    email = 'any_emal'
    password = 'any_password'
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveUser.mockResolvedValue({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_emal'
    })
    crypto = mock()
    crypto.encrypt.mockResolvedValue({ key: 'any_encrypted_key' })
    token = mock()
    token.generate.mockResolvedValue({ accessToken: 'any_token' })
  })

  beforeEach(() => {
    sut = setupSingup(userAccountRepo, crypto, token)
  })

  it('should  call load with correct input', async () => {
    await sut({ name, email, password })
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should throw  EmailInUseError  if load return data', async () => {
    userAccountRepo.load.mockResolvedValueOnce({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_emal'
    })

    const promise = sut({ name, email, password })
    await expect(promise).rejects.toThrow()
  })

  it('should  rethrow if load throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_by_email_error'))
    const promise = sut({ name, email, password })
    await expect(promise).rejects.toThrow(new Error('load_by_email_error'))
  })

  it('should  call encrypter with correct input', async () => {
    await sut({ name, email, password })
    expect(crypto.encrypt).toHaveBeenCalledWith({ value: password })
    expect(crypto.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should  rethrow if encrypter throws', async () => {
    crypto.encrypt.mockRejectedValueOnce(new Error('encrypter_error'))
    const promise = sut({ name, email, password })
    await expect(promise).rejects.toThrow(new Error('encrypter_error'))
  })

  it('should  call saveUser with correct input', async () => {
    await sut({ name, email, password })
    expect(userAccountRepo.saveUser).toHaveBeenCalledWith({ name, email, password: 'any_encrypted_key' })
    expect(userAccountRepo.saveUser).toHaveBeenCalledTimes(1)
  })

  it('should  rethrow if Saveuser throws', async () => {
    userAccountRepo.saveUser.mockRejectedValueOnce(new Error('save_user_error'))
    const promise = sut({ name, email, password })
    await expect(promise).rejects.toThrow(new Error('save_user_error'))
  })

  it('should  call generateToken with correct input', async () => {
    await sut({ name, email, password })
    expect(token.generate).toHaveBeenCalledWith({ key: 'any_user_id' })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('should  call tokenGenerator with correct input', async () => {
    await sut({ name, email, password })
    expect(token.generate).toHaveBeenCalledWith({ key: 'any_user_id' })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('should  return an accessToken on success', async () => {
    const accessToken = await sut({ name, email, password })
    expect(accessToken).toEqual({ accessToken: 'any_token' })
  })

  it('should  rethrow if generateToken throws', async () => {
    token.generate.mockRejectedValueOnce(new Error('save_user_error'))
    const promise = sut({ name, email, password })
    await expect(promise).rejects.toThrow(new Error('save_user_error'))
  })
})
