import { Dayjs } from "dayjs";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export enum STATEMENT_TYPE {
  INCOME = "income",
  EXPENSE = "expense",
}

@Entity("statements")
class Statement {
  @PrimaryColumn()
  id?: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  type: STATEMENT_TYPE;

  @CreateDateColumn()
  created_at: Dayjs;

  @CreateDateColumn()
  updated_at: Dayjs;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Statement };
