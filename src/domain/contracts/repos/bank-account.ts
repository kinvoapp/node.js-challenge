export namespace AddFinantialIncomeRepository {
  export type Input = { type: string, value: number, description: string, user_id: number }
  export type Output = undefined | { id: string, type: string, value: number, description: string, user_id: number }

}

export interface AddFinantialIncomeRepository {
  add: (param: AddFinantialIncomeRepository.Input) => Promise<AddFinantialIncomeRepository.Output>
}

export namespace LoadFinantialIncomeByTypeRepository {
  export type Input = { type: string }
  export type Output = undefined | { id: number, type: string, value: number, description: string, user_id: number }

}

export interface LoadFinantialIncomeByTypeRepository {
  load: (param: LoadFinantialIncomeByTypeRepository.Input) => Promise<LoadFinantialIncomeByTypeRepository.Output>
}

export namespace LoadFinantialIncomeByUserIdRepository {
  export type Input = { userId: number }
  export type Output = undefined | { id: number, type: string, value: number, description: string, user_id: number }

}

export interface LoadFinantialIncomeByUserIdRepository {
  load: (param: LoadFinantialIncomeByUserIdRepository.Input) => Promise<LoadFinantialIncomeByUserIdRepository.Output>
}

export namespace UpdateFinantialIncomeRepository {
  export type Input = { id: number, type: string, value: number, description: string }
  export type Output = undefined | { message: string }

}

export interface UpdateFinantialIncomeRepository {
  update: (param: UpdateFinantialIncomeRepository.Input) => Promise<UpdateFinantialIncomeRepository.Output>
}
