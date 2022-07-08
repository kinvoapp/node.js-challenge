import { ICreateTransactionRepository } from "../../domain/interface/repositories/Transaction/ICreateTransactionRepository";

export class CreateListingService {
  private createTransactionRepository: ICreateTransactionRepository;

  constructor(createTransactionRepository: ICreateTransactionRepository) {
    this.createTransactionRepository = createTransactionRepository;
  }
}
