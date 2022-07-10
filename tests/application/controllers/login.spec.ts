import { Controller } from '@/application/controller'
import { RequiredStringValidator, ValidationBuilder, Validator } from '@/application/validation'

import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { Login } from '@/domain/use-cases'

type HttpRequest = {
  email: string
  password: string
}
type Model = Error | { accessToken: string }

export class LoginController extends Controller {
  constructor (private readonly login: Login) {
    super()
  }

  async perform ({ email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.login({ email, password })
      return ok(accessToken)
    } catch (error) {
      return unauthorized()
    }
  }

  override buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: email, fieldName: 'email' }).required().build(),
      ...ValidationBuilder.of({ value: password, fieldName: 'password' }).required().build()
    ]
  }
}

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
})
