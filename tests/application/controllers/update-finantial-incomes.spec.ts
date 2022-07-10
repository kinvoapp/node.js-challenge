import { UpdateFinatitalIncomesControler } from '@/application/controller'
import { RequiredStringValidator } from '@/application/validation'
import { ServerError } from '@/domain/entities/errors'

describe('AddFinatitalIncomesControler', () => {
  let sut: UpdateFinatitalIncomesControler
  let updateFinantialIncomes: jest.Mock
  let loadFinantialIncomes: jest.Mock
  let loadFinantialIncomesByType: jest.Mock

  beforeAll(() => {
    updateFinantialIncomes = jest.fn()
    updateFinantialIncomes.mockResolvedValue({ message: 'updated' })

    loadFinantialIncomes = jest.fn()
    loadFinantialIncomes.mockResolvedValue({

    })

    loadFinantialIncomesByType = jest.fn()
    loadFinantialIncomesByType.mockResolvedValue({})
  })

  beforeEach(() => {
    sut = new UpdateFinatitalIncomesControler(updateFinantialIncomes, loadFinantialIncomes, loadFinantialIncomesByType)
  })
  describe('Validaptor', () => {
    it('should build  validator correctly', async () => {
      const validators = sut.buildValidators({ id: 1, type: 'any_type', value: 1000, description: 'any_desc' })
      expect(validators).toEqual([
        new RequiredStringValidator('any_type', 'type'),
        new RequiredStringValidator('1000', 'value'),
        new RequiredStringValidator('any_desc', 'description')
      ])
    })
  })
  describe('loadByUserId', () => {
    it('should call load with correct params', async () => {
      await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
      expect(loadFinantialIncomes).toHaveBeenCalledWith({ userId: 1 })
      expect(loadFinantialIncomes).toHaveBeenCalledTimes(1)
    })

    it('should return 500 if load fails', async () => {
      loadFinantialIncomes.mockRejectedValueOnce(new ServerError())
      const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError()
      })
    })

    it('should return 500 if load fails', async () => {
      const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: undefined })
      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError()
      })
    })
  })

  describe('loadType', () => {
    it('should call loadType with correct params', async () => {
      await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
      expect(loadFinantialIncomesByType).toHaveBeenCalledWith({ type: 'any_type' })
      expect(loadFinantialIncomesByType).toHaveBeenCalledTimes(1)
    })

    it('should return 500 if loadType fails', async () => {
      loadFinantialIncomesByType.mockRejectedValueOnce(new ServerError())
      const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError()
      })
    })

    it('should return 500 loadType fails', async () => {
      const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: undefined })
      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError()
      })
    })
  })

  describe('update', () => {
    it('should call update with correct params', async () => {
      await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
      expect(updateFinantialIncomes).toHaveBeenCalledWith({ type: 'any_type', value: 1000, description: 'any_desc' })
      expect(updateFinantialIncomes).toHaveBeenCalledTimes(1)
    })

    it('should return 500 if update fails', async () => {
      updateFinantialIncomes.mockRejectedValueOnce(new ServerError())
      const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: 1 })
      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError()
      })
    })

    it('should return 500 upadaye fails', async () => {
      const httpResponse = await sut.handle({ type: 'any_type', value: 1000, description: 'any_desc' }, { userId: undefined })
      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError()
      })
    })
  })
})
