import { mock, MockProxy } from 'jest-mock-extended'

export class EmailInUseError extends Error {
  constructor () {
    super('This email is already taken')
    this.name = 'EmailInUseError'
  }
}

export namespace LoadUserAccountRepository {
  export type Input = { email: string }
  export type Output = null | {
    id: string
    name: string
    email: string
    password: string
  }
}

export interface LoadUserAccountRepository {
  loadByEmail: (params: LoadUserAccountRepository.Input) => Promise<LoadUserAccountRepository.Output>
}

type Input = { name: string, email: string, password: string }
type Output = Promise<void>
type Setup = (userAccountRepo: LoadUserAccountRepository) => Authentication

export type Authentication = (params: Input) => Output

export const setupAuthentication: Setup = (userAccountRepo) => async params => {
  const accountData = await userAccountRepo.loadByEmail({ email: params.email })
  if (accountData !== undefined) throw new EmailInUseError()
}

describe('Authentication', () => {
  let name: string
  let email: string
  let password: string

  let sut: Authentication
  let userAccountRepo: MockProxy<LoadUserAccountRepository>

  beforeAll(() => {
    name = 'any_name'
    email = 'any_emal'
    password = 'any_password'
    userAccountRepo = mock()
  })

  beforeEach(() => {
    sut = setupAuthentication(userAccountRepo)
  })

  it('should  call loadByEmail with correct input', async () => {
    await sut({ name, email, password })
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

    const promise = sut({ name, email, password })
    await expect(promise).rejects.toThrow()
  })

  it('should  rethrow if loadByEmail throws', async () => {
    userAccountRepo.loadByEmail.mockRejectedValueOnce(new Error('load_by_email_error'))
    const promise = sut({ name, email, password })
    await expect(promise).rejects.toThrow(new Error('load_by_email_error'))
  })
})
