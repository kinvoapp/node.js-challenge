import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

class User {
  
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string

  @Column()
  password: string
    
  @Column()
  balance: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  

  constructor() {
    if (!this.id)
      this.id = uuid()
  }
}

export {User}