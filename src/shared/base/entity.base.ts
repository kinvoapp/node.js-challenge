import { Exclude } from "class-transformer";
import { CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class EntityBase {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Exclude()
    @CreateDateColumn({ nullable: true, type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @Exclude()
    @UpdateDateColumn({ nullable: true, type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt?: Date;
}