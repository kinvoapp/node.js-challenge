import { IncomeRepository } from "./../../repositories/Income";

// Interface de dados para criação de uma nova receita
interface IncomeCreateRequest {
  name: string;
  value: number;
}

// Classe que faz criação de uma nova receita
export class IncomeCreateUseCase {
  constructor(private IncomeRepo: IncomeRepository) {}

  async create(request: IncomeCreateRequest) {
    const { name, value } = request;

    // Caso não seja enviado nome da receita, retorna erro
    if (!name) {
      throw new Error("A income name is required.");
    }

    // Caso não seja enviado valor da receita, retorna erro
    if (!value || value === 0) {
      throw new Error("A income value is required.");
    }

    // Cria e retorna a receita
    const income = await this.IncomeRepo.create({
      name,
      value,
    });

    return income;
  }
}
