//import { User } from './User';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string
    
    @Column({ type: 'float'})
    value: number

    @Column({ type: 'text', nullable: true })
    description: string
    
   // @Column()
   // date: Date

}