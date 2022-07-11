export interface IDeleteTransactionService {
  execute(id: string, accountId: string): Promise<void>;
}
