import { SpendRepository } from "./../../repositories/Spend";

interface SpendDeleteRequest {
  id: number;
}

// Classe que faz a exclusão de uma despesa
export class SpendDeleteUseCase {
  constructor(private SpendRepo: SpendRepository) {}

  async delete(request: SpendDeleteRequest) {
    const { id } = request;

    if (!id || id === 0) {
      throw new Error("Spend id is required.");
    }

    await this.SpendRepo.delete({ id });
  }
}
