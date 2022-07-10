export namespace AddFinantialIncomeRepository {
  export type Input = { type: string, value: number, description: string, userId: string }
  export type Output = { id: string, type: string, value: number, description: string, userId: string }

}

export interface AddFinantialIncomeRepository {
  add: (param: AddFinantialIncomeRepository.Input) => Promise<AddFinantialIncomeRepository.Output>
}
