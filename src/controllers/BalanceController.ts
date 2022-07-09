import { Request, Response } from "express";

import { PrismaIncomeRepository } from "../repositories/prisma/PrismaIncomeRepository";
import { PrismaSpendRepository } from "../repositories/prisma/PrismaSpendRepository";
import { IncomeReadUseCase } from "../usecases/Income/read-use-case";
import { SpendReadUseCase } from "../usecases/Spend/read-use-case";

import { CError, CSuccess } from "../classes/responses";

class BalanceController {
  async read(request: Request, response: Response): Promise<any> {
    try {
      // Estancia um repositório do prisma
      const IncomeRepository = new PrismaIncomeRepository();

      // Caso de uso para leitura
      const IncomeUseCase = new IncomeReadUseCase(IncomeRepository);

      const SpendRepository = new PrismaSpendRepository();

      const SpendUseCase = new SpendReadUseCase(SpendRepository);

      // Como há um intervalo de tempo exigido, são exibidos dados do dia 01/01/2022 até o momento atual
      const start = new Date(2022, 1, 1);
      const end = new Date();

      const spends = await SpendUseCase.read({
        start,
        end,
      });

      let totalSpent: number = 0;

      // Itera sobre o array de gastos para saber o total que foi gasto
      for (const index in spends) {
        totalSpent += spends[index]["value"];
      }

      const incomes = await IncomeUseCase.read({
        start,
        end,
      });

      let totalSaved: number = 0;

      // Itera sobre o array de receitas para saber o total guardado
      for (const index in incomes) {
        totalSaved += incomes[index]["value"];
      }

      // Soma do valor guardado o valor gasto
      const currentBalance = totalSaved - totalSpent;

      return response.status(200).send(new CSuccess(true, currentBalance));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method read.", error));
    }
  }
}

export default new BalanceController();
