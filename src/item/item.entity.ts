import { Item } from 'src/item/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => Item, (item) => item.user)
  items?: Item[];
}
