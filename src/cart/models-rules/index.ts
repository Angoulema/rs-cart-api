import { CartItems } from 'src/database/entities/cart-items.entity';
import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: CartItems[]): number {
  return cart ? cart.reduce((acc: number, { count }: CartItem) => {
    return acc += count;
  }, 0) : 0;
}
