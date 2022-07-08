export namespace LoadUserAccountRepository {
  export type Input = { email: string }
  export type Output = undefined | {
    id: string
    name: string
    email: string
    password: string
  }
}

export interface LoadUserAccountRepository {
  loadByEmail: (params: LoadUserAccountRepository.Input) => Promise<LoadUserAccountRepository.Output>
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
  saveUser: (params: SaveUserAccountRepository.Input) => Promise<SaveUserAccountRepository.Output>
}
