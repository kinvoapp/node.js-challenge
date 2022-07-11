import { Request, Response } from "express";
import { container } from "tsyringe";

import { STATEMENT_TYPE } from "../../infra/typeorm/entities/Statement";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

class CreateStatementController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { amount, description } = req.body;

    const path = req.originalUrl.split("/");

    const type = path[path.length - 1] as STATEMENT_TYPE;

    const createStatementUseCase = container.resolve(CreateStatementUseCase);

    const statement = await createStatementUseCase.execute({
      amount,
      description,
      type,
    });

    return res.status(201).json(statement);
  }
}

export { CreateStatementController };
