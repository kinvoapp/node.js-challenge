import { Exclude } from "class-transformer";
import { EntityBase } from "src/shared/base/entity.base";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('expense')
export class Expense {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Exclude()
    @CreateDateColumn({ nullable: true, type: 'date' })
    createdAt?: Date;

    @Exclude()
    @CreateDateColumn({ nullable: true, type: 'date' })
    updatedAt?: Date;

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'float', nullable: false })
    value: number

    @Column({ type: 'varchar' })
    description: string

    /*   constructor(exprense?: Partial<Expense>) {
          this.createdAt = exprense.createdAt;
          this.updatedAt = exprense.updatedAt;
          this.id = exprense.id;
          this.title = exprense.title;
          this.description = exprense.description;
          this.value = exprense.value;
      } */

}

