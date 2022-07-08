import { TokenGenerator } from '@/domain/contracts/crypto'
import { sign } from 'jsonwebtoken'

export class JwtTokenHandler {
  constructor (private readonly secret: string) { }
  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret)
  }
}
