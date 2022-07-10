import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "../../users/models/User";

@Entity('transactions')
class Transaction {
  
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  value: number
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  user_id: string;
  @ManyToOne(type => User, user => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  

  constructor() {
    if (!this.id)
      this.id = uuid()
  }
}

export {Transaction}