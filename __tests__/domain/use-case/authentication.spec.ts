import { mock, MockProxy } from 'jest-mock-extended'

export namespace LoadUserAccountRepository {
  export type Input = { email: string }
  export type Output = undefined
}

export interface LoadUserAccountRepository {
  loadByEmail: (params: LoadUserAccountRepository.Input) => Promise<LoadUserAccountRepository.Output>
}

type Input = { name: string, email: string, password: string }
type Output = Promise<void>
type Setup = (userAccountRepo: LoadUserAccountRepository) => Authentication

export type Authentication = (params: Input) => Output

export const setupAuthentication: Setup = (userAccountRepo) => async params => {
  await userAccountRepo.loadByEmail(params)
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
    expect(userAccountRepo.loadByEmail).toHaveBeenCalledWith({ name, email, password })
    expect(userAccountRepo.loadByEmail).toHaveBeenCalledTimes(1)
  })
})
