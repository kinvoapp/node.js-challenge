import { prisma } from "../../services/prisma";
import { IncomeRepository, IncomeCreateData, IncomeReadData, IncomeUpdateData, IncomeDeleteData } from "./../Income";

// Classe que faz toda a manipulação de dados de uma receita
export class PrismaIncomeRepository implements IncomeRepository {
  // Método para criação de uma receita
  async create({ name, value }: IncomeCreateData) {
    const income = await prisma.income.create({
      data: {
        name,
        value,
      },
    });

    return income;
  }

  // Método para listagem de receitas
  async read({ start, end }: IncomeReadData) {
    const incomes = await prisma.income.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    return incomes;
  }

  // Método para edição de uma receita
  async update({ name, value, id }: IncomeUpdateData) {
    const income = await prisma.income.update({
      where: {
        id,
      },
      data: {
        name,
        value,
      },
    });

    return income;
  }

  // Método para exclusão de uma receita
  async delete({ id }: IncomeDeleteData) {
    await prisma.income.delete({
      where: { id },
    });
  }
}
