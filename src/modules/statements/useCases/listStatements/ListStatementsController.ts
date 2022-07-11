import { Dayjs } from "dayjs";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListStatementsUseCase } from "./ListStatementsUseCase";

interface IListStatementsRequest {
  date: Dayjs;
  by: "start_date" | "final_date";
  itensPerPageType: number;
  pageNumber: number;
}

class ListStatementsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { date, by, itensPerPageType, pageNumber } =
      req.query as unknown as IListStatementsRequest;

    const listStatementsUseCase = container.resolve(ListStatementsUseCase);

    const statements = await listStatementsUseCase.execute({
      date,
      by,
      itensPerPageType,
      pageNumber,
    });

    return res.json(statements);
  }
}

export { ListStatementsController };
