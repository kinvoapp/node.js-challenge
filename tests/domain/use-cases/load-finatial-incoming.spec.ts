import { LoadFinantialIcomingsRepository } from '@/domain/contracts/repos'
import { LoadFinantialIcomings, setupLoadFinantialIcomings } from '@/domain/use-cases/index'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadFinantialIncomeByUserId', () => {
  let sut: LoadFinantialIcomings
  let bankAccoutRepo: MockProxy<LoadFinantialIcomingsRepository>

  beforeAll(() => {
    bankAccoutRepo = mock()
    bankAccoutRepo.loadAll.mockResolvedValue({
      id: 1,
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      user_id: 1
    })
  })

  beforeEach(() => {
    sut = setupLoadFinantialIcomings(bankAccoutRepo)
  })

  it('should call load with correct input', async () => {
    await sut({ userId: 1 })
    expect(bankAccoutRepo.loadAll).toHaveBeenCalledWith({ userId: 1 })
    expect(bankAccoutRepo.loadAll).toHaveBeenCalledTimes(1)
  })

  it('should return a finantial income on sucess', async () => {
    const result = await sut({ userId: 1 })
    expect(result).toEqual({
      id: 1,
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      user_id: 1
    })
  })

  it('should rethrow if finatila icome not found', async () => {
    bankAccoutRepo.loadAll.mockResolvedValueOnce(undefined)
    const promise = sut({ userId: 1 })
    await expect(promise).rejects.toThrow()
  })
})
