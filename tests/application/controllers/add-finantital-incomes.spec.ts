import { AddFinatitalIncomesControler } from '@/application/controller/'
import { RequiredStringValidator } from '@/application/validation'
import { ServerError } from '@/domain/entities/errors'

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
    const validators = sut.buildValidators({ type: 'any_type', value: 1000, description: 'any_desc' })
    expect(validators).toEqual([
      new RequiredStringValidator('any_type', 'type'),
      new RequiredStringValidator('1000', 'value'),
      new RequiredStringValidator('any_desc', 'description')
    ])
  })

  it('should call add with correct params', async () => {
    await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
    expect(addFinantialIncomes).toHaveBeenCalledWith({ type: 'any_type', value: 1000, description: 'any_desc', user_id: 1 })
    expect(addFinantialIncomes).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if add fails', async () => {
    addFinantialIncomes.mockRejectedValueOnce(new ServerError())
    const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })

  it('should return 500 if add fails', async () => {
    const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: undefined })
    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })

  it('should return  204 if addFinantialIncomes succeeds', async () => {
    const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
    expect(httpResponse).toEqual({
      statusCode: 204
    })
  })
})
