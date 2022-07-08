import { Controller } from '@/application/controller'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
import { FacebookAthentication } from '@/domain/use-cases'

type HttpRequest = { token: string }
type Model = Error | { accessToken: string }

export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuth: FacebookAthentication) {
    super()
  }

  async perform ({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.facebookAuth({ token })
      return ok(accessToken)
    } catch (error) {
      return unauthorized()
    }
  }

  override buildValidators ({ token }: HttpRequest): Validator[] {
    return [...ValidationBuilder.of({ value: token, fieldName: 'token' }).required().build()]
  }
}
