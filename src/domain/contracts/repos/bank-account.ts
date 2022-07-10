export namespace AddFinantialIncomeRepository {
  export type Input = { type: string, value: number, description: string, user_id: number }
  export type Output = undefined |{ id: string, type: string, value: number, description: string, user_id: number }

}

export interface AddFinantialIncomeRepository {
  add: (param: AddFinantialIncomeRepository.Input) => Promise<AddFinantialIncomeRepository.Output>
}

export namespace LoadFinantialIncomeByUserIdRepository {
  export type Input = { userId: number }
  export type Output = undefined | { id: string, type: string, value: number, description: string, user_id: number }

}

export interface LoadFinantialIncomeByUserIdRepository {
  load: (param: LoadFinantialIncomeByUserIdRepository.Input) => Promise<LoadFinantialIncomeByUserIdRepository.Output>
}
