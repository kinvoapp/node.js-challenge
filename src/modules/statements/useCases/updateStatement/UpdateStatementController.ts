import { Request, Response } from "express";
import { container } from "tsyringe";

import { STATEMENT_TYPE } from "../../infra/typeorm/entities/Statement";
import { UpdateStatementUseCase } from "./UpdateStatementUseCase";

interface IUpdateStatementRequest {
  amount: number;
  description: string;
  type: STATEMENT_TYPE;
}

class UpdateStatementController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { amount, description, type } = req.body as IUpdateStatementRequest;

    const updateStatementUseCase = container.resolve(UpdateStatementUseCase);

    const updatedStatement = await updateStatementUseCase.execute({
      id,
      dataToUpdate: {
        amount,
        description,
        type,
      },
    });

    return res.status(200).json(updatedStatement);
  }
}

export { UpdateStatementController };
