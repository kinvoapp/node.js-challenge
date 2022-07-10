import { RequiredStringValidator } from '@/application/validation'
import { UnauthorizedError } from '@/application/errors'
import { AuthenticationError } from '@/domain/entities/errors'
import { LoginController } from '@/application/controller/login'

describe('LoginController', () => {
  let sut: LoginController
  let login: jest.Mock

  beforeAll(() => {
    login = jest.fn()
    login.mockResolvedValue({ accessToken: 'any_value' })
  })

  beforeEach(() => {
    sut = new LoginController(login)
  })

  it('should build  validator correctly', async () => {
    const validators = sut.buildValidators({ email: 'any_email', password: 'any_password' })
    expect(validators).toEqual([
      new RequiredStringValidator('any_email', 'email'),
      new RequiredStringValidator('any_password', 'password')
    ])
  })

  it('should call login with correct params', async () => {
    await sut.handle({ email: 'any_valid_email', password: 'any_valid_password' })
    expect(login).toHaveBeenCalledWith({ email: 'any_valid_email', password: 'any_valid_password' })
    expect(login).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if login fails', async () => {
    login.mockRejectedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ email: 'any_valid_email', password: 'any_valid_password' })
    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return  200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ email: 'any_valid_email', password: 'any_valid_password' })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_value' }
    })
  })
})
