import { LoadFinantialIncomeByTypeRepository } from '@/domain/contracts/repos'
import { LoadFinantialIncomeByType, setupLoadFinantialIncomeByTypeRepository, setupLoadFinantialIncomeByUserId } from '@/domain/use-cases/index'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadFinantialIncomeByUserId', () => {
  let sut: LoadFinantialIncomeByType
  let bankAccoutRepo: MockProxy<LoadFinantialIncomeByTypeRepository>

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
    sut = setupLoadFinantialIncomeByTypeRepository(bankAccoutRepo)
  })

  it('should call load with correct input', async () => {
    await sut({ type: 'any_type' })
    expect(bankAccoutRepo.load).toHaveBeenCalledWith({ type: 'any_type' })
    expect(bankAccoutRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should return a finantial income on sucess', async () => {
    const result = await sut({ type: 'any_type' })
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
    const promise = sut({ type: 'any_type' })
    await expect(promise).rejects.toThrow()
  })
})
