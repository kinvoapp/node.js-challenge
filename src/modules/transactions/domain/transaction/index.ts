export enum TransactionType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw'
}

export type TransactionProps = {
  id?: string
  value: number
  type: TransactionType
  description: string
}

export class Transaction {
  props: TransactionProps

  private constructor(props: TransactionProps) {
    this.props = props
  }

  static create(props: TransactionProps): Transaction {
    const transaction = new Transaction(props)
    return transaction
  }
}
