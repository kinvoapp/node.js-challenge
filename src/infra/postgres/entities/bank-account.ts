
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity({ name: 'bankAccount' })
export class bankAccount {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  type!: string

  @Column()
  value!: string

  @Column({ nullable: false })
  description!: string

  @Column()
  user_id!: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User
}
