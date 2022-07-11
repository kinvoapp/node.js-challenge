import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("transaction_history")
export class TransactionHistory {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: "int",
  })
  id: number;

  @Column({ type: "float" })
  entry: number;

  @Column({
    type: "date",
    default: new Date().toISOString(),
  })
  created_at: string;
}
