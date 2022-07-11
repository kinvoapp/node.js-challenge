import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('balance')
export class Balance {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    calculated_balance: number;
}
