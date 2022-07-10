import { RequiredStringValidator, ValidationBuilder, Validator } from '@/application/validation'

import { Controller } from '@/application/controller'
import { HttpResponse, noContent, unauthorized } from '@/application/helpers'
import { AddFinantialIncome } from '@/domain/use-cases'

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
      return unauthorized()
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

describe('AddFinatitalIncomesControler', () => {
  let sut: AddFinatitalIncomesControler
  let addFinantialIncomes: jest.Mock

  beforeAll(() => {
    addFinantialIncomes = jest.fn()
    addFinantialIncomes.mockResolvedValue({ accessToken: 'any_value' })
  })

  beforeEach(() => {
    sut = new AddFinatitalIncomesControler(addFinantialIncomes)
  })

  it('should build  validator correctly', async () => {
    const validators = sut.buildValidators({ type: 'any_type', value: 1000, description: 'any_desc', user_id: 1 })
    expect(validators).toEqual([
      new RequiredStringValidator('any_type', 'type'),
      new RequiredStringValidator('1000', 'value'),
      new RequiredStringValidator('any_desc', 'description'),
      new RequiredStringValidator('1', 'user_id')
    ])
  })
})
