import { IncomeRepository } from "../../repositories/Income";

// Interface
interface IncomeDeleteRequest {
  id: number;
}

// Classe para fazer exclusão de uma receita
export class IncomeDeleteUseCase {
  constructor(private IncomeRepo: IncomeRepository) {}

  async delete(request: IncomeDeleteRequest) {
    const { id } = request;

    // Caso não seja enviado id, retorna erro
    if (!id || id === 0) {
      throw new Error("Income id is required.");
    }

    await this.IncomeRepo.delete({ id });
  }
}
