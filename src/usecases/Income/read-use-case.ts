import { IncomeRepository } from "../../repositories/Income";

interface IncomeReadRequest {
  start: Date;
  end: Date;
}

// Classe que retorna todas as receitas
export class IncomeReadUseCase {
  constructor(private IncomeRepo: IncomeRepository) {}

  async read(request: IncomeReadRequest) {
    const { start, end } = request;

    // Se a data incial for maior que a data final
    if (start >= end) {
      throw new Error("Final date must be greater than the inital date.");
    }

    const incomes = await this.IncomeRepo.read({
      start,
      end,
    });

    return incomes;
  }
}
