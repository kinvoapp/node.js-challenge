type AccountData = {
  id?: string
  name: string
  email: string
  password: string
}

export class UserAccount {
  id?: string
  name?: string
  email: string
  password: string

  constructor (accountData: AccountData) {
    this.id = accountData?.id
    this.name = accountData.name
    this.email = accountData.email
    this.password = accountData.password
  }
}
