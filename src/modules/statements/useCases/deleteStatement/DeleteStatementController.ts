import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteStatementUseCase } from "./DeleteStatementUseCase";

class DeleteStatementController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteStatementUseCase = container.resolve(DeleteStatementUseCase);

    await deleteStatementUseCase.execute(id);

    return res.status(200).send();
  }
}

export { DeleteStatementController };
