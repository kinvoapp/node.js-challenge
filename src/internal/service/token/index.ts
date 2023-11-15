import envVariables from '@/env'
import jwt from 'jsonwebtoken'

export const tokenService = {
  sign(payload: string | object | Buffer, subject: string) {
    return jwt.sign(payload, envVariables.JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
      subject,
    })
  },
}
