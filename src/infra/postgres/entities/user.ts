
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  name!: string

  @Column()
  email!: string

  @Column({ nullable: false })
  password!: string
}
