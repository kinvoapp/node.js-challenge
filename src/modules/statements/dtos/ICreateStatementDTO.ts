import { Dayjs } from "dayjs";

import { STATEMENT_TYPE } from "../infra/typeorm/entities/Statement";

interface ICreateStatementDTO {
  id?: string;
  amount: number;
  description: string;
  type: STATEMENT_TYPE;
  created_at?: Dayjs;
  updated_at?: Dayjs;
}

export { ICreateStatementDTO };
