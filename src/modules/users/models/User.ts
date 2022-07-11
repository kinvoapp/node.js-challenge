import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Transaction } from "../../transactions/model/Transaction";
import { UserToken } from "./UserToken";

@Entity('users')
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

  @OneToMany(() => UserToken, userToken => userToken.user_id)
  userTokens: UserToken[]

  @OneToMany(type => Transaction, transaction => transaction.user)
  transactions: Transaction[]
  

  constructor() {
    if (!this.id)
      this.id = uuid()
  }
}

export {User}