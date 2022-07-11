import { Dayjs } from "dayjs";

interface IManipulateDaysDTO {
  days: number;
  type: "add" | "subtract";
}

interface IDateProvider {
  dateNow(): Date;
  dateNowInUTC(): Dayjs;
  manipulateDays(data: IManipulateDaysDTO): Date;
  manipulateDaysInUTC(data: IManipulateDaysDTO): Dayjs;
  isDateUTC(date: Dayjs | Date): boolean;
}

export { IDateProvider, IManipulateDaysDTO };
