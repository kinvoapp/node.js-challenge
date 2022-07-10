import Decimal from 'decimal.js';
import { User } from 'src/user/user.entity';
import { DecimalTransformer } from 'src/util/DecimalTransformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  title: string;
  // https://medium.com/@matthew.bajorek/how-to-properly-handle-decimals-with-typeorm-f0eb2b79ca9c
  @Column({
    type: 'decimal',
    precision: 9,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  value: Decimal;
  @CreateDateColumn()
  createdDate: Date;

  @Column({ name: 'input_value', type: 'boolean', default: false })
  inputValue: boolean;

  @Column({ length: 255, default: '' })
  description?: string;
  @ManyToOne(() => User, (user) => user.items, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
