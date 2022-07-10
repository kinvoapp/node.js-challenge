import { Controller } from '@/application/controller'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
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
