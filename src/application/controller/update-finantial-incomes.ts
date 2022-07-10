import { HttpResponse, noContent, serverError, unauthorized } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
import { LoadFinantialIncomeByType, LoadFinantialIncomeByUserId, UpdateFinantialIncome } from '@/domain/use-cases'
import { Controller } from './controller'

type HttpRequest = {
  id: number
  type: string
  value: number
  description: string
  locals?: any
}
type Model = Error | { accessToken: string }

export class UpdateFinatitalIncomesControler extends Controller {
  constructor (
    private readonly update: UpdateFinantialIncome,
    private readonly load: LoadFinantialIncomeByUserId,
    private readonly loadByType: LoadFinantialIncomeByType

  ) {
    super()
  }

  async perform ({ id, type, value, description, locals }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (locals.userId !== undefined) {
        const resultLodById = await this.load({ userId: locals.userId })
        const resultLodByType = await this.loadByType({ type })
        if (resultLodById !== undefined && resultLodByType !== undefined) {
          await this.update({ id, type, value, description })
          return noContent()
        }
      }
      return serverError(unauthorized())
    } catch (error) {
      return serverError(error)
    }
  }

  override buildValidators ({ type, value, description }: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: type, fieldName: 'type' }).required().build(),
      ...ValidationBuilder.of({ value: value !== undefined ? value.toString() : '', fieldName: 'value' }).required().build(),
      ...ValidationBuilder.of({ value: description, fieldName: 'description' }).required().build()
    ]
  }
}
