// Imports
import { Request, Response } from "express";

import { PrismaIncomeRepository } from "./../repositories/prisma/PrismaIncomeRepository";

import { IncomeCreateUseCase } from "./../usecases/Income/create-use-case";
import { IncomeReadUseCase } from "./../usecases/Income/read-use-case";
import { IncomeUpdateUseCase } from "./../usecases/Income/update-use-case";
import { IncomeDeleteUseCase } from "../usecases/Income/delete-use-case";

import { CError, CSuccess } from "../classes/responses";

class IncomeController {
  async create(request: Request, response: Response): Promise<any> {
    try {
      const { name, value }: { name: string; value: number } = Object(request["body"]);

      // Estancia um repositório do prisma
      const PrismaRepository = new PrismaIncomeRepository();

      // Estancia um caso de uso para a criação
      const CreateUseCase = new IncomeCreateUseCase(PrismaRepository);

      // Cria a receita
      const income = await CreateUseCase.create({
        name,
        value,
      });

      return response.status(201).send(new CSuccess(true, income));
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

      // Estancia um repositório do prisma
      const PrismaRepository = new PrismaIncomeRepository();

      // Caso de uso para leitura
      const ReadUseCase = new IncomeReadUseCase(PrismaRepository);

      // Converte timestamp pra date
      const startDate = new Date(initial);
      const finalDate = new Date(final);

      // Receitas
      const incomes = await ReadUseCase.read({
        start: startDate,
        end: finalDate,
      });

      // Função que faz paginação
      const paginate = (res: any[], pageIndex: number) => {
        // Retorna paginas de 3 em 3 itens
        return res.slice((pageIndex - 1) * 3, pageIndex * 3);
      };

      // Declara uma variável para receber os dados retornados de acordo com a página atual
      const data = paginate(incomes, page);

      return response.status(200).send(new CSuccess(true, data));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method read.", error));
    }
  }

  async update(request: Request, response: Response): Promise<any> {
    try {
      const { name, value }: { name: string; value: number } = Object(request["body"]);

      const { incomeId }: { incomeId: string } = Object(request["query"]);

      // Faz conversão de tipo do id, ema vez que na query ele vem como string
      const id = parseInt(incomeId);

      // Estancia um repositório do prisma
      const PrismaRepository = new PrismaIncomeRepository();

      // Caso de uso de atualização
      const UpdateUseCase = new IncomeUpdateUseCase(PrismaRepository);

      // Atualiza a receita
      const income = await UpdateUseCase.update({
        id,
        name,
        value,
      });

      return response.status(200).send(new CSuccess(true, income));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method update.", error));
    }
  }

  async delete(request: Request, response: Response): Promise<any> {
    try {
      const { incomeId }: { incomeId: string } = Object(request["query"]);

      // Faz conversão de tipo do id, ema vez que na query ele vem como string
      const id = parseInt(incomeId);

      // Estancia um repositório do prisma
      const PrismaRepository = new PrismaIncomeRepository();

      const DeleteUseCase = new IncomeDeleteUseCase(PrismaRepository);

      await DeleteUseCase.delete({ id });

      return response.status(200).send(new CSuccess(true, "Income deleted successfully."));
    } catch (error: any) {
      return response.status(error["code"] ? error["code"] : 500).send(new CError("Error at method delete.", error));
    }
  }
}

export default new IncomeController();
