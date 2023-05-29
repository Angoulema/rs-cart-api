import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItems } from './cart-items.entity';

export enum Statuses {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED'
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'date'
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'date'
  })
  updatedAt!: Date;

  @Column({
    name: 'status'
  })
  status: Statuses;

  // @OneToOne(() => CartItems, (cartItems) => cartItems.cartId) // specify inverse side as a second parameter
  // cartItems: CartItems
}
