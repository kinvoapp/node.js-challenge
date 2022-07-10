import { AddFinantialIncomeRepository } from '@/domain/contracts/repos'
import { getRepository } from 'typeorm'
import { BankAccount } from '../entities'
export class PgBankAccountRepository implements AddFinantialIncomeRepository {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async add ({ type, value, description, user_id }: AddFinantialIncomeRepository.Input): Promise<AddFinantialIncomeRepository.Output> {
    const pgBankAccountRepo = getRepository(BankAccount)
    const pgBankAccount = await pgBankAccountRepo.save({ type, value, description, user_id })
    return { id: pgBankAccount.id.toString(), type: pgBankAccount.type, value: pgBankAccount.value, description: pgBankAccount.description, user_id: pgBankAccount.user_id }
  }
}
