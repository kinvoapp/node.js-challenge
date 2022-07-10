import Decimal from 'decimal.js';
import { User } from 'src/user/user.entity';
import { DecimalTransformer } from 'src/util/DecimalTransformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
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
  value: Decimal | string;

  // https://stackoverflow.com/questions/62696628/how-can-i-create-columns-with-type-date-and-type-datetime-in-nestjs-with-typeorm
  @Column()
  @Index()
  createdDate: string;

  @Column({ nullable: true })
  @Index()
  updatedDate: string;

  @Column({ name: 'input_value', type: 'boolean', default: false })
  inputValue: boolean;

  @Column({ length: 255, default: '' })
  description?: string;

  @ManyToOne(() => User, (user) => user.items, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  constructor(item?: Partial<Item>) {
    this.id = item?.id;
    this.title = item?.title;
    this.value = item?.value;
    this.createdDate = item?.createdDate || new Date().toISOString();
    this.updatedDate = item?.updatedDate;
    this.inputValue = item?.inputValue;
    this.description = item?.description;
    this.user = item?.user;
  }
}
