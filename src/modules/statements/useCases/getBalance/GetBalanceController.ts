import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetBalanceUseCase } from "./GetBalanceUseCase";

class GetBalanceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getBalanceUseCase = container.resolve(GetBalanceUseCase);

    const balance = await getBalanceUseCase.execute();

    return res.json(balance);
  }
}

export { GetBalanceController };
