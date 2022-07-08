import { mock, MockProxy } from 'jest-mock-extended'

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
    password: string
  }
}

export interface SaveUserAccountRepository {
  saveUser: (params: SaveUserAccountRepository.Input) => Promise<SaveUserAccountRepository.Output>
}

type Setup = (userAccountRepo: LoadUserAccountRepository & SaveUserAccountRepository) => Authentication
export type Authentication = (name: string, email: string, password: string) => Promise<undefined | {
  id: string
  name: string
  email: string
  password: string
}>

export const setupAuthentication: Setup = (userAccountRepo) => async (name, email, password) => {
  const accountData = await userAccountRepo.loadByEmail({ email })
  if (accountData !== undefined) throw new EmailInUseError()
  return await userAccountRepo.saveUser({ name, email, password })
}

describe('Authentication', () => {
  let name: string
  let email: string
  let password: string

  let sut: Authentication
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
      email: 'any_user_emal',
      password: 'any_user_password'
    })
  })

  beforeEach(() => {
    sut = setupAuthentication(userAccountRepo)
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

  it('should  call saveUser with correct input', async () => {
    await sut(name, email, password)
    expect(userAccountRepo.saveUser).toHaveBeenCalledWith({ name, email, password })
    expect(userAccountRepo.saveUser).toHaveBeenCalledTimes(1)
  })

  it('should return an user account on success', async () => {
    const userAccount = await sut(name, email, password)
    expect(userAccount).toEqual({
      id: 'any_user_id',
      name: 'any_user_name',
      email: 'any_user_emal',
      password: 'any_user_password'
    })
  })
})
