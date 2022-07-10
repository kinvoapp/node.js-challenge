import { Controller } from '@/application/controller'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
import { Singup } from '@/domain/use-cases'

type HttpRequest = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
type Model = Error | { accessToken: string }

export class SingupController extends Controller {
  constructor (private readonly singup: Singup) {
    super()
  }

  async perform ({ name, email, password, confirmPassword }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.singup({ name, email, password })
      return ok(accessToken)
    } catch (error) {
      console.log(error)

      return unauthorized()
    }
  }

  override buildValidators ({ name, email, password, confirmPassword }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: name, fieldName: 'name' }).required().build(),
      ...ValidationBuilder.of({ value: email, fieldName: 'email' }).required().build(),
      ...ValidationBuilder.of({ value: password, fieldName: 'password' }).required().build(),
      ...ValidationBuilder.of({ value: password, fieldName: 'password' }).compare(confirmPassword).build()

    ]
  }
}
