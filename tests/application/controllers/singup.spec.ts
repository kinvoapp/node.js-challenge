import { SingupController } from '@/application/controller'
import { ComparedFieldValidator, RequiredStringValidator } from '@/application/validation'
import { AuthenticationError } from '@/domain/entities/errors'
import { UnauthorizedError } from '@/application/errors'

describe('SingupController', () => {
  let sut: SingupController
  let singup: jest.Mock

  beforeAll(() => {
    singup = jest.fn()
    singup.mockResolvedValue({ accessToken: 'any_value' })
  })

  beforeEach(() => {
    sut = new SingupController(singup)
  })

  it('should build  validator correcty', async () => {
    const validators = sut.buildValidators({ name: 'any_name', email: 'any_email', password: 'any_password', confirmPassword: 'any_password' })
    expect(validators).toEqual([
      new RequiredStringValidator('any_name', 'name'),
      new RequiredStringValidator('any_email', 'email'),
      new RequiredStringValidator('any_password', 'password'),
      new ComparedFieldValidator('any_password', 'any_password')
    ])
  })

  it('should call singup with correct params', async () => {
    await sut.handle({ name: 'any_valid_name', email: 'any_valid_email', password: 'any_valid_password', confirmPassword: 'any_valid_password' })
    expect(singup).toHaveBeenCalledWith({ name: 'any_valid_name', email: 'any_valid_email', password: 'any_valid_password' })
    expect(singup).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if singup fails', async () => {
    singup.mockRejectedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ name: 'any_valid_name', email: 'any_valid_email', password: 'any_valid_password', confirmPassword: 'any_valid_password' })
    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return  200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ name: 'any_valid_name', email: 'any_valid_email', password: 'any_valid_password', confirmPassword: 'any_valid_password' })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_value' }
    })
  })
})
