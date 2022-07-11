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

/**
 * **organizesMovement**
 * is a function that receives an array of objects of type `IMovement`
 * and the parameters `from` and `to` (optional) as parameters.
 * Returns an array of objects that may or may not be filtered by the from and to parameters.
 *
 * @param movements is an array of objects from IMovement.
 * @param from is an number and optional.
 * @param to is an number and optional.
 * @returns {IMovement[]} the array of objects that may or may not be filtered by the from and to parameters.
 */

function organizesMovement (movements: IMovement[], from?: number, to?: number): IMovement[] {
  return movements.map((e) => {
    return {
      id: e._id,
      type: e.type,
      value: e.value,
      category: e.category,
      date: e.date,
      note: e.note
    }
  }).slice(from, to)
}

export default {
  balanceMovement,
  organizesMovement
}
