import { LoadFinantialIncomeByTypeRepository } from '@/domain/contracts/repos'
import { LoadFinantialIncomeByType, setupLoadFinantialIncomeByType, setupLoadFinantialIncomeByUserId } from '@/domain/use-cases/index'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadFinantialIncomeByUserId', () => {
  let sut: LoadFinantialIncomeByType
  let bankAccoutRepo: MockProxy<LoadFinantialIncomeByTypeRepository>

  beforeAll(() => {
    bankAccoutRepo = mock()
    bankAccoutRepo.loadByType.mockResolvedValue({
      id: 1,
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      user_id: 1
    })
  })

  beforeEach(() => {
    sut = setupLoadFinantialIncomeByType(bankAccoutRepo)
  })

  it('should call load with correct input', async () => {
    await sut({ type: 'any_type' })
    expect(bankAccoutRepo.loadByType).toHaveBeenCalledWith({ type: 'any_type' })
    expect(bankAccoutRepo.loadByType).toHaveBeenCalledTimes(1)
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
    bankAccoutRepo.loadByType.mockResolvedValueOnce(undefined)
    const promise = sut({ type: 'any_type' })
    await expect(promise).rejects.toThrow()
  })
})
