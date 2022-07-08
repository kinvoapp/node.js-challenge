export namespace LoadUserAccountRepository {
  export type Input = { email: string }
  export type Output = undefined | {
    id: string
    name: string
    email: string
  }
}

export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Input) => Promise<LoadUserAccountRepository.Output>
}

export namespace SaveUserAccountRepository {
  export type Input = { name: string, email: string, password: string }
  export type Output = {
    id: string
    name: string
    email: string
  }
}

export interface SaveUserAccountRepository {
  save: (params: SaveUserAccountRepository.Input) => Promise<SaveUserAccountRepository.Output>
}
