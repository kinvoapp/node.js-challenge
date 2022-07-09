import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entry!: number;

  @Column()
  created_at!: Date;
}
