import { container } from "tsyringe";

import "./providers/DateProvider";

import { StatementsRepository } from "../../modules/statements/infra/typeorm/repositories/implementations/StatementsRepository";
import { IStatementsRepository } from "../../modules/statements/infra/typeorm/repositories/IStatementsRepository";

container.registerSingleton<IStatementsRepository>(
  "StatementsRepository",
  StatementsRepository
);
