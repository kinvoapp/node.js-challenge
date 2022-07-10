import Utils from '../utils/movementsUtils'
import { IMovement } from 'types'

test('must return balance of movements', () => {
  const arr: IMovement[] = [
    {
      _id: '62c9cf218adf8b69bbee4484',
      type: 'expense',
      value: 1200,
      category: 'studies',
      date: '2022-04-18'
    },
    {
      _id: '62c9cf218adf8b69bbee4484',
      type: 'expense',
      value: 1200,
      category: 'studies',
      date: '2022-04-18'
    },
    {
      _id: '62c9e5ab59468436b7e40ab0',
      type: 'income',
      value: 1000,
      category: 'personal',
      date: '2022-07-12'
    },
    {
      _id: '62c9e5ab59468436b7e40ab0',
      type: 'income',
      value: 2000,
      category: 'personal',
      date: '2022-07-12'
    }

  ]

  expect(Utils.balanceMovement(arr)).toStrictEqual({
    expenses: 2400,
    incomes: 3000,
    balance: 600
  })
})
