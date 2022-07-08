import { IncomeRepository } from "./../../repositories/Income";

// Interface de dados para atualização de uma receita
interface IncomeUpdateRequest {
  name: string;
  value: number;
  id: number;
}

// Classe que faz atualização da receita
export class IncomeUpdateUseCase {
  constructor(private IncomeRepo: IncomeRepository) {}

  async update(request: IncomeUpdateRequest) {
    const { id, name, value } = request;

    // Caso não seja enviado nome da receita, retorna erro
    if (!name) {
      throw new Error("A income name is required.");
    }

    // Caso não seja enviado valor da receita, retorna erro
    if (!value) {
      throw new Error("A income value is required.");
    }

    // Caso não seja enviado um id, retorna erro
    if (!id || id === 0) {
      throw new Error("Income id is required.");
    }

    // Atualiza a receita
    const income = await this.IncomeRepo.update({
      id,
      name,
      value,
    });

    return income;
  }
}
