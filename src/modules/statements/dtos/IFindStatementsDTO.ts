import { Dayjs } from "dayjs";

interface IFindStatementsDTO {
  date: Dayjs;
  by: "start_date" | "final_date";
}

export { IFindStatementsDTO };
