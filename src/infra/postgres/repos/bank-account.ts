import { AddFinantialIncomeRepository, LoadFinantialIcomingsRepository, LoadFinantialIncomeByTypeRepository, LoadFinantialIncomeByUserIdRepository, UpdateFinantialIncomeRepository } from '@/domain/contracts/repos'
import { UpdateFinantialIncome } from '@/domain/use-cases'
import { getRepository } from 'typeorm'
import { BankAccount } from '../entities'
export class PgBankAccountRepository implements AddFinantialIncomeRepository, LoadFinantialIncomeByUserIdRepository, LoadFinantialIncomeByUserIdRepository {
  async add ({ type, value, description, user_id }: AddFinantialIncomeRepository.Input): Promise<AddFinantialIncomeRepository.Output> {
    const pgBankAccountRepo = getRepository(BankAccount)
    const pgBankAccount = await pgBankAccountRepo.save({ type, value, description, user_id })
    return { id: pgBankAccount.id.toString(), type: pgBankAccount.type, value: pgBankAccount.value, description: pgBankAccount.description, user_id: pgBankAccount.user_id }
  }

  async load ({ userId }: LoadFinantialIncomeByUserIdRepository.Input): Promise<LoadFinantialIncomeByUserIdRepository.Output> {
    const pgBankAccountRepo = getRepository(BankAccount)
    const pgBankAccount = await pgBankAccountRepo.findOne({
      where: {
        user_id: userId
      }
    })
    return pgBankAccount !== undefined ? pgBankAccount : undefined
  }

  async loadByType ({ type }: LoadFinantialIncomeByTypeRepository.Input): Promise<LoadFinantialIncomeByTypeRepository.Output> {
    const pgBankAccountRepo = getRepository(BankAccount)
    const pgBankAccount = await pgBankAccountRepo.findOne({
      where: {
        type
      }
    })
    return pgBankAccount !== undefined ? pgBankAccount : undefined
  }

  async loadAll ({ userId }: LoadFinantialIcomingsRepository.Input): Promise<LoadFinantialIcomingsRepository.Output> {
    const pgBankAccountRepo = getRepository(BankAccount)
    const pgBankAccount = await pgBankAccountRepo.find()
    return pgBankAccount.length > 0 ? pgBankAccount : []
  }

  async update ({ id, type, value, description }: UpdateFinantialIncomeRepository.Input): Promise<UpdateFinantialIncomeRepository.Output> {
    const pgBankAccountRepo = getRepository(BankAccount)
    const pgBankAccount = await pgBankAccountRepo.update({ id }, { type, value, description })
    return pgBankAccount !== undefined ? { message: 'updated' } : undefined
  }
}
