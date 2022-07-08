import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

class Transaction {
  
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  value: string
  
  @CreateDateColumn()
  created_at: Date

    @UpdateDateColumn()
  updated_at: Date
  

  constructor() {
    if (!this.id)
      this.id = uuid()
  }
}

export {Transaction}