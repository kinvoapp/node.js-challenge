import { IMovement, Balance } from 'types'

/**
 * **balanceMovement**
 * is a function that receives an array from the IMovement interface
 * and returns an object of type Balance.
 *
 * @param arr is an IMovement array.
 * @returns {Balance} an object of type Balance.
 */

function balanceMovement (arr: IMovement[]): Balance {
  const expenses = arr.filter((e) => e.type === 'expense').map((e) => e.value).reduce((a, b) => a + b, 0)
  const incomes = arr.filter((e) => e.type === 'income').map((e) => e.value).reduce((a, b) => a + b, 0)
  const balance = incomes - expenses

  return {
    expenses,
    incomes,
    balance
  }
}

export default { balanceMovement }
