import { UserAccount } from '@/domain/entities'

describe('UserAccount', () => {
  const userAccountData = {
    name: 'any_facebook_name',
    email: 'any_facebook_email',
    password: 'password'
  }

  it('should create account with user data only', () => {
    const sut = new UserAccount(userAccountData)
    expect(sut).toEqual(userAccountData)
  })
})
