import { Request, Response } from "express";

import { PrismaSpendRepository } from "./../repositories/prisma/PrismaSpendRepository";

import { SpendDeleteUseCase } from "./../usecases/Spend/delete-use-case";
import { SpendUpdateUseCase } from "./../usecases/Spend/update-use-case";
import { SpendReadUseCase } from "./../usecases/Spend/read-use-case";
import { SpendCreateUseCase } from "./../usecases/Spend/create-use-case";

import { CError, CSuccess } from "../classes/responses";

class SpendController {
  async create(request: Request, response: Response): Promise<any> {
    try {
      const { name, value }: { name: string; value: number } = Object(request["body"]);

      // Instancia um repositório do prisma
      const PrismaRepository = new PrismaSpendRepository();

      const CreateUseCase = new SpendCreateUseCase(PrismaRepository);

      // Cria a despesa
      const spend = await CreateUseCase.create({
        name,
        value,
      });

      return response.status(201).send(new CSuccess(true, spend));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method create.", error));
    }
  }

  async read(request: Request, response: Response): Promise<any> {
    try {
      // Recebe datas finais e iniciais da query (em timestamp)
      const { start, end, page = 1 }: { start: string; end: string; page: number } = Object(request["query"]);

      // Converte as datas iniciais e finais para number, já que vêm em string
      const initial = parseInt(start);
      const final = parseInt(end);

      // Instancia um repositório do prisma
      const PrismaRepository = new PrismaSpendRepository();

      const ReadUseCase = new SpendReadUseCase(PrismaRepository);

      // Converte timestamp pra date
      const startDate = new Date(initial);
      const finalDate = new Date(final);

      // Despesas
      const spends = await ReadUseCase.read({
        start: startDate,
        end: finalDate,
      });

      // Função que faz paginação
      const paginate = (res: any[], pageIndex: number) => {
        // Retorna paginas de 3 em 3 itens
        return res.slice((pageIndex - 1) * 3, pageIndex * 3);
      };

      // Declara uma variável para receber os dados retornados de acordo com a página atual
      const data = paginate(spends, page);

      return response.status(200).send(new CSuccess(true, data));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method read.", error));
    }
  }

  async update(request: Request, response: Response): Promise<any> {
    try {
      const { name, value }: { name: string; value: number } = Object(request["body"]);

      const { spendId }: { spendId: string } = Object(request["query"]);

      const id = parseInt(spendId);

      const PrismaRepository = new PrismaSpendRepository();

      const UpdateUseCase = new SpendUpdateUseCase(PrismaRepository);

      const spend = await UpdateUseCase.update({
        id,
        name,
        value,
      });

      return response.status(200).send(new CSuccess(true, spend));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method update.", error));
    }
  }

  async delete(request: Request, response: Response): Promise<any> {
    try {
      const { spendId }: { spendId: string } = Object(request["query"]);

      const id = parseInt(spendId);

      const PrismaRepository = new PrismaSpendRepository();

      const DeleteUseCase = new SpendDeleteUseCase(PrismaRepository);

      await DeleteUseCase.delete({ id });

      return response.status(200).send(new CSuccess(true, "Spend deleted successfully."));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method delete.", error));
    }
  }
}

export default new SpendController();
