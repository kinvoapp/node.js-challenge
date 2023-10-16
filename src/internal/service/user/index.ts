import createUser from './create-user'
import updateUser from './update-user'
import updateUserPass from './update-user-pass'
import findUser from './find-user'
import findOneUser from './find-one-user'
import balanceUser from './balance-user'

export const userService = {
  createUser,
  updateUser,
  updatePass: updateUserPass,
  findUser,
  findOneUser,
  balanceUser,
}
