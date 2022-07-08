import { Encrypter } from '@/domain/contracts/crypto'
import bcrypt from 'bcrypt'

type Input = { value: string }
type Output = { key: string }

export class BcryptHandler implements Encrypter {
  constructor (private readonly salt: number) { }
  async encrypt (params: Input): Promise<Output> {
    const hashedPassword = await bcrypt.hash(params.value, this.salt)
    return { key: hashedPassword }
  }
}
