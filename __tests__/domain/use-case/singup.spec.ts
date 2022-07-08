import { mock, MockProxy } from 'jest-mock-extended'

export namespace TokenGenerator {
  export type Input = { key: string }
  export type Output = { token: string }
}
export interface TokenGenerator {
  generate: (params: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}

export namespace Encrypter {
  export type Input = { password: string }
  export type Output = { key: string }
}
export interface Encrypter {
  encrypt: (params: Encrypter.Input) => Promise<Encrypter.Output>
}

export class EmailInUseError extends Error {
  constructor () {
    super('This email is already taken')
    this.name = 'EmailInUseError'
  }
}

export namespace LoadUserAccountRepository {
  export type Input = { email: string }
  export type Output = undefined | {
    id: string
    name: string
    email: string
    password: string
  }
}

export interface LoadUserAccountRepository {
  loadByEmail: (params: LoadUserAccountRepository.Input) => Promise<LoadUserAccountRepository.Output>
}

export namespace SaveUserAccountRepository {
  export type Input = { name: string, email: string, password: string }
  export type Output = {
    id: string
    name: string
    email: string
  }
}

export interface SaveUserAccountRepository {
  saveUser: (params: SaveUserAccountRepository.Input) => Promise<SaveUserAccountRepository.Output>
}

type Setup = (
  userAccountRepo: LoadUserAccountRepository & SaveUserAccountRepository,
  crypto: Encrypter,
  token: TokenGenerator
) => Singup
export type Singup = (name: string, email: string, password: string) => Promise<{ token: string }>

export const setupSingup: Setup = (userAccountRepo, crypto, token) => async (name, email, password) => {
  const accountData = await userAccountRepo.loadByEmail({ email })
  if (accountData !== undefined) throw new EmailInUseError()
  const passwordHashed = await crypto.encrypt({ password })
  const { id } = await userAccountRepo.saveUser({ name, email, password: passwordHashed.key })
  const accessToken = await token.generate({ key: id })
  return { token: accessToken.token }
}

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
    userAccountRepo.loadByEmail.mockResolvedValue(undefined)
    userAccountRepo.saveUser.mockResolvedValue({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_emal'
    })
    crypto = mock()
    crypto.encrypt.mockResolvedValue({ key: 'any_encrypted_key' })
    token = mock()
    token.generate.mockResolvedValue({ token: 'any_token' })
  })

  beforeEach(() => {
    sut = setupSingup(userAccountRepo, crypto, token)
  })

  it('should  call loadByEmail with correct input', async () => {
    await sut(name, email, password)
    expect(userAccountRepo.loadByEmail).toHaveBeenCalledWith({ email })
    expect(userAccountRepo.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw  EmailInUseError  if loadByEmail return data', async () => {
    userAccountRepo.loadByEmail.mockResolvedValueOnce({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_emal',
      password: 'any_user_password'
    })

    const promise = sut(name, email, password)
    await expect(promise).rejects.toThrow()
  })

  it('should  rethrow if loadByEmail throws', async () => {
    userAccountRepo.loadByEmail.mockRejectedValueOnce(new Error('load_by_email_error'))
    const promise = sut(name, email, password)
    await expect(promise).rejects.toThrow(new Error('load_by_email_error'))
  })

  it('should  call encrypter with correct input', async () => {
    await sut(name, email, password)
    expect(crypto.encrypt).toHaveBeenCalledWith({ password })
    expect(crypto.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should  rethrow if encrypter throws', async () => {
    crypto.encrypt.mockRejectedValueOnce(new Error('encrypter_error'))
    const promise = sut(name, email, password)
    await expect(promise).rejects.toThrow(new Error('encrypter_error'))
  })

  it('should  call saveUser with correct input', async () => {
    await sut(name, email, password)
    expect(userAccountRepo.saveUser).toHaveBeenCalledWith({ name, email, password: 'any_encrypted_key' })
    expect(userAccountRepo.saveUser).toHaveBeenCalledTimes(1)
  })

  it('should  rethrow if Saveuser throws', async () => {
    userAccountRepo.saveUser.mockRejectedValueOnce(new Error('save_user_error'))
    const promise = sut(name, email, password)
    await expect(promise).rejects.toThrow(new Error('save_user_error'))
  })

  it('should  call generateToken with correct input', async () => {
    await sut(name, email, password)
    expect(token.generate).toHaveBeenCalledWith({ key: 'any_user_id' })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('should  call tokenGenerator with correct input', async () => {
    await sut(name, email, password)
    expect(token.generate).toHaveBeenCalledWith({ key: 'any_user_id' })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('should  return an accessToken on success', async () => {
    const accessToken = await sut(name, email, password)
    expect(accessToken).toEqual({ token: 'any_token' })
  })

  it('should  rethrow if generateToken throws', async () => {
    token.generate.mockRejectedValueOnce(new Error('save_user_error'))
    const promise = sut(name, email, password)
    await expect(promise).rejects.toThrow(new Error('save_user_error'))
  })
})
