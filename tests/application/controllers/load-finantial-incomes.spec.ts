import { LoadFinatitalIncomesControler } from '@/application/controller'
import { ServerError } from '@/domain/entities/errors'

describe('LoadFinantialIcomingsRepository', () => {
  let sut: LoadFinatitalIncomesControler
  let loadFinantialIncomes: jest.Mock

  beforeAll(() => {
    loadFinantialIncomes = jest.fn()
    loadFinantialIncomes.mockResolvedValue([
      { id: 1, type: 'any_type', value: 1000, description: 'any_des', user_id: 2 },
      { id: 1, type: 'any_type', value: 1000, description: 'any_des', user_id: 2 }
    ])
  })

  beforeEach(() => {
    sut = new LoadFinatitalIncomesControler(loadFinantialIncomes)
  })
  describe('loadByUserId', () => {
    it('should call load with correct params', async () => {
      await sut.handle({}, { userId: 1 })

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
  })
})
