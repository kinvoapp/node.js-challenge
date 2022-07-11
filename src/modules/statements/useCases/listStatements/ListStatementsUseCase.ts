import { Dayjs } from "dayjs";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/App.Error";
import { IStatementsRepository } from "../../infra/typeorm/repositories/IStatementsRepository";
import { InvalidByValue } from "../errors/InvalidByValue";
import { InvalidItensPerPageTypeValue } from "../errors/InvalidItensPerPageTypeValue";
import { InvalidPageNumberValue } from "../errors/InvalidPageNumberValue";

const numberOfItensOptions = [5, 10, 15, 20, 25, 30];

interface IRequest {
  date: Dayjs;
  by: "start_date" | "final_date";
  itensPerPageType: number;
  pageNumber: number;
}

@injectable()
class ListStatementsUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ date, by, itensPerPageType, pageNumber }: IRequest) {
    if (!this.dateProvider.isDateUTC(date)) {
      throw new AppError("Date error");
    }

    if (itensPerPageType < 0 || itensPerPageType > 5) {
      throw new InvalidItensPerPageTypeValue(
        0,
        numberOfItensOptions.length - 1
      );
    }

    if (by !== "start_date" && by !== "final_date") {
      throw new InvalidByValue();
    }

    const statements = await this.statementsRepository.list({
      date,
      by,
    });

    const maxPages = statements.length / numberOfItensOptions[itensPerPageType];

    if (pageNumber > maxPages + 1 || pageNumber <= 0) {
      throw new InvalidPageNumberValue(1, Math.ceil(maxPages));
    }

    const initIndex =
      pageNumber * numberOfItensOptions[itensPerPageType] -
      numberOfItensOptions[itensPerPageType];

    const finalIndex = initIndex + numberOfItensOptions[itensPerPageType];

    const statementsReturn = statements.slice(initIndex, finalIndex);

    return statementsReturn;
  }
}

export { ListStatementsUseCase };
