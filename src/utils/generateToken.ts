import jwt from 'jsonwebtoken'
import auth  from '../config/auth';

export default (id: string) => {
  return jwt.sign({ id: id }, auth.secret, {
    expiresIn: 604800
  })
}