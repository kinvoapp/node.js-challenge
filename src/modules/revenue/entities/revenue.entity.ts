import { Exclude } from "class-transformer";
import { EntityBase } from "src/shared/base/entity.base";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('revenue')
export class Revenue {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Exclude()
    @CreateDateColumn({ nullable: true, type: 'date' })
    createdAt?: Date;

    @Exclude()
    @UpdateDateColumn({ nullable: true, type: 'date' })
    updatedAt?: Date;

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'float', nullable: false })
    value: number

    @Column({ type: 'varchar' })
    description: string
}