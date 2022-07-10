import { Exclude } from "class-transformer";
import { User } from "src/modules/user/entities/user.entity";
import { EntityBase } from "src/shared/base/entity.base";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => User, (user) => user.expenses)
    user: User
}

