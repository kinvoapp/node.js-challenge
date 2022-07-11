import { Exclude } from "class-transformer";
import { Expense } from "src/modules/expense/entities/expense.entity";
import { Revenue } from "src/modules/revenue/entities/revenue.entity";
import { RolesType } from "src/shared/types/roles.type";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Exclude()
    @CreateDateColumn({ nullable: true, type: 'date' })
    createdAt?: Date;

    @Exclude()
    @CreateDateColumn({ nullable: true, type: 'date' })
    updatedAt?: Date;

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar', unique: true })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @Column({ type: 'enum', enum: RolesType, enumName: 'RolesType' })
    roles: RolesType

    @Column({ type: 'boolean', default: true })
    active: boolean

    @OneToMany(() => Revenue, (Revenue) => Revenue.user)
    revenues: Revenue[]

    @OneToMany(() => Expense, (Expense) => Expense.user)
    expenses: Expense[]
}
