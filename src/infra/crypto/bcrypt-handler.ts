import { Encrypter } from '@/domain/contracts/crypto'
import bcrypt from 'bcrypt'
namespace encrypt {
  export type Input = { value: string }
  export type Output = { key: string }
}

namespace compare {
  export type Input = { value: string, valueToCompare: string }
  export type Output = boolean
}

export class BcryptHandler implements Encrypter {
  constructor (private readonly salt: number) { }

  async encrypt (params: encrypt.Input): Promise<encrypt.Output> {
    const hashedPassword = await bcrypt.hash(params.value, this.salt)
    return { key: hashedPassword }
  }

  async compare (params: compare.Input): Promise<compare.Output> {
    return await bcrypt.compare(params.value, params.valueToCompare)
  }
}
