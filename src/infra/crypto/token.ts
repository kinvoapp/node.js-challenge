import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class JwtTokenHandler {
  constructor (private readonly secret: string) { }
  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret)
  }

  async validate ({ token }: TokenValidator.Input): Promise<TokenGenerator.Output> {
    const paylod = verify(token, this.secret) as JwtPayload
    return paylod.key
  }
}
