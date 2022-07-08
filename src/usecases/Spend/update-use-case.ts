import { SpendRepository } from "./../../repositories/Spend";

// Interface
interface SepndUpdateRequest {
  id: number;
  name: string;
  value: number;
}

// Classe que faz o update de uma despesa
export class SpendUpdateUseCase {
  constructor(private SpendRepo: SpendRepository) {}

  async update(request: SepndUpdateRequest) {
    const { id, name, value } = request;

    if (!id || id === 0) {
      throw new Error("Id is required.");
    }

    if (!name) {
      throw new Error("Spend Name is required.");
    }

    if (!value || value === 0) {
      throw new Error("Spend value is required.");
    }

    const spend = await this.SpendRepo.update({
      id,
      name,
      value,
    });

    return spend;
  }
}
