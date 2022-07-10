import { forbidden, HttpResponse, noContent, serverError, unauthorized } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
import { AddFinantialIncome } from '@/domain/use-cases'
import { UnauthorizedError } from '../errors'
import { Controller } from './controller'

type HttpRequest = {
  type: string
  value: number
  description: string
  locals?: any
}
type Model = Error | { accessToken: string }

export class AddFinatitalIncomesControler extends Controller {
  constructor (private readonly add: AddFinantialIncome) {
    super()
  }

  async perform ({ type, value, description, locals }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (locals.userId !== undefined) {
        await this.add({ type, value, description, user_id: locals.userId })
        return noContent()
      }
      return serverError(unauthorized())
    } catch (error) {
      return serverError(error)
    }
  }

  override buildValidators ({ type, value, description }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: type, fieldName: 'type' }).required().build(),
      ...ValidationBuilder.of({ value: value.toString(), fieldName: 'value' }).required().build(),
      ...ValidationBuilder.of({ value: description, fieldName: 'description' }).required().build()
    ]
  }
}
