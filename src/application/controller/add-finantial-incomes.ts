import { HttpResponse, noContent, serverError } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
import { AddFinantialIncome } from '@/domain/use-cases'
import { Controller } from './controller'

type HttpRequest = {
  type: string
  value: number
  description: string
  user_id: number
}
type Model = Error | { accessToken: string }

export class AddFinatitalIncomesControler extends Controller {
  constructor (private readonly add: AddFinantialIncome) {
    super()
  }

  async perform ({ type, value, description, user_id }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.add({ type, value, description, user_id })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  override buildValidators ({ type, value, description, user_id }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: type, fieldName: 'type' }).required().build(),
      ...ValidationBuilder.of({ value: value.toString(), fieldName: 'value' }).required().build(),
      ...ValidationBuilder.of({ value: description, fieldName: 'description' }).required().build(),
      ...ValidationBuilder.of({ value: user_id.toString(), fieldName: 'user_id' }).required().build()
    ]
  }
}
