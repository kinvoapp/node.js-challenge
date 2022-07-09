import { SpendRepository } from "./../../repositories/Spend";

// Interface de dados para criação de uma nova despesa
interface SpendCreateRequest {
  name: string;
  value: number;
}

// Classe que faz criação de uma nova despesa
export class SpendCreateUseCase {
  constructor(private SpendRepo: SpendRepository) {}

  async create(request: SpendCreateRequest) {
    const { name, value } = request;

    // Caso não seja enviado um nome
    if (!name) {
      throw new Error("Spend name is required.");
    }

    // Caso não seja enviado um valor
    if (!value || value === 0) {
      throw new Error("Spend value is required.");
    }

    const spend = await this.SpendRepo.create({
      name,
      value,
    });

    return spend;
  }
}
