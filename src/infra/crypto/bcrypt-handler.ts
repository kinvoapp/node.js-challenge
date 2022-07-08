import bcrypt from 'bcrypt'

type Input = { value: string }
type Output = string

export class BcryptHandler {
  constructor (private readonly salt: number) { }
  async encrypt (params: Input): Promise<Output> {
    const hashedPassword = await bcrypt.hash(params.value, this.salt)
    return hashedPassword
  }
}
