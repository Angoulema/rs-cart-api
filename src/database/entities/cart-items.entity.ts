import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity({ name: 'cart_items' })
export class CartItems {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id'})
  productId: string;

  @Column({ name: 'count_', type: 'integer'})
  count: number;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cartId: Cart;
}
