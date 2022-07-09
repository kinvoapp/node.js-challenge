import { SpendRepository } from "./../../repositories/Spend";

interface SpendDateRequest {
  start: Date;
  end: Date;
}

// Classe que retorna as despesas
export class SpendReadUseCase {
  constructor(private SpendRepo: SpendRepository) {}

  async read(request: SpendDateRequest) {
    const { start, end } = request;

    // Se a data incial for maior que a data final
    if (start >= end) {
      throw new Error("Final date must be greater than the inital date.");
    }

    const spends = await this.SpendRepo.read({
      start,
      end,
    });

    return spends;
  }
}
