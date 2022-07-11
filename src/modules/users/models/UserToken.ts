import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "./User";


@Entity('user_tokens')
class UserToken {

  @PrimaryColumn()
  id: string

  @Column()
  token: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  user_id: string
  @ManyToOne('users', (user: User) => user.userTokens)
  @JoinColumn({ name: 'user_id' })
  user: User

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export {UserToken}