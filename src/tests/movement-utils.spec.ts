import Utils from '../utils/movements.utils'
import { IMovement } from 'types'

const arr: IMovement[] = [
  {
    type: 'expense',
    _id: '62c9cf218adf8b69bbee4484',
    category: 'studies',
    value: 1200,
    date: '2022-04-18',
    note: ''
  },
  {
    _id: '62c9cf218adf8b69bbee4484',
    value: 1200,
    category: 'studies',
    date: '2022-04-18',
    type: 'expense',
    note: ''
  },
  {
    category: 'personal',
    value: 1000,
    type: 'income',
    date: '2022-07-12',
    _id: '62c9e5ab59468436b7e40ab0',
    note: ''
  },
  {
    type: 'income',
    category: 'personal',
    value: 2000,
    _id: '62c9e5ab59468436b7e40ab0',
    date: '2022-07-12',
    note: ''
  }
]

describe('should test utils moves', () => {
  test('must return balance of movements', () => {
    expect(Utils.balanceMovement(arr)).toStrictEqual({
      expenses: 2400,
      incomes: 3000,
      balance: 600
    })
  })

  test('should test if it returns movements', () => {
    expect(Utils.organizesMovement(arr, 0, 1)).toStrictEqual([{
      id: '62c9cf218adf8b69bbee4484',
      type: 'expense',
      value: 1200,
      category: 'studies',
      date: '2022-04-18',
      note: ''
    }])

    expect(Utils.organizesMovement(arr, 0, 2)).toStrictEqual([{
      id: '62c9cf218adf8b69bbee4484',
      type: 'expense',
      value: 1200,
      category: 'studies',
      date: '2022-04-18',
      note: ''
    }, {
      id: '62c9cf218adf8b69bbee4484',
      type: 'expense',
      value: 1200,
      category: 'studies',
      date: '2022-04-18',
      note: ''
    }])
  })
})
