import { prisma } from "../../services/prisma";
import { SpendRepository, SpendCreateData, SpendUpdateData, SpendDeleteData, SpendReadData } from "../Spend";

// Classe faz toda a manipulação de dados de uma despesa
export class PrismaSpendRepository implements SpendRepository {
  // Método para criação de uma despesa
  async create({ name, value }: SpendCreateData) {
    const spend = await prisma.spend.create({
      data: {
        name,
        value,
      },
    });

    return spend;
  }

  // Método para listagem de despesas
  async read({ start, end }: SpendReadData) {
    const spends = await prisma.spend.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    return spends;
  }

  // Método para edição de uma despesa
  async update({ id, name, value }: SpendUpdateData) {
    const spend = await prisma.spend.update({
      where: {
        id,
      },
      data: {
        name,
        value,
      },
    });

    return spend;
  }

  // Método para exclusão de uma despesa
  async delete({ id }: SpendDeleteData) {
    await prisma.spend.delete({
      where: { id },
    });
  }
}
