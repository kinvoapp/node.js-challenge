import { LoadFinantialIncomeByUserIdRepository } from '@/domain/contracts/repos'
import { LoadFinantialIncomeByUserId, setupLoadFinantialIncomeByUserId } from '@/domain/use-cases/index'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadFinantialIncomeByUserId', () => {
  let sut: LoadFinantialIncomeByUserId
  let bankAccoutRepo: MockProxy<LoadFinantialIncomeByUserIdRepository>

  beforeAll(() => {
    bankAccoutRepo = mock()
    bankAccoutRepo.load.mockResolvedValue({
      id: 1,
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      user_id: 1
    })
  })

  beforeEach(() => {
    sut = setupLoadFinantialIncomeByUserId(bankAccoutRepo)
  })

  it('should call load with correct input', async () => {
    await sut({ userId: 1 })
    expect(bankAccoutRepo.load).toHaveBeenCalledWith({ userId: 1 })
    expect(bankAccoutRepo.load).toHaveBeenCalledTimes(1)
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
    bankAccoutRepo.load.mockResolvedValueOnce(undefined)
    const promise = sut({ userId: 1 })
    await expect(promise).rejects.toThrow()
  })
})
