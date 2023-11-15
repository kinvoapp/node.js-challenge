import { FindTransactionDto } from './find-transaction.dto'

export interface FindCountDto extends Pick<FindTransactionDto, 'finalDate' | 'initialDate'> {}
