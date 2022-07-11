import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('earnings')
export class Earning {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string
    
    @Column({ type: 'float'})
    value: number

    @Column({ type: 'text', nullable: true })
    description: string
    
//    @Column()
//    date: Date

    
}