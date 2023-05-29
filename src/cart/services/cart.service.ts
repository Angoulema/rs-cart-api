import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

// import { Cart } from '../models';
import { Cart, Statuses } from '../../database/entities/cart.entity';
import { CartItems } from '../../database/entities/cart-items.entity';

@Injectable()
export class CartService {
  @InjectRepository(Cart)
  private userCarts: Repository<Cart>

  @InjectRepository(CartItems)
  private cartItems: Repository<CartItems>

  async findByUserId(userId: string): Promise<CartItems[] | null> {
    console.log('userId', userId);
    // const cart = await this.userCarts.findOne({ where: { userId }, relations: ['cartItems'] });
    const cartWithData = await this.cartItems.createQueryBuilder('cart_items')
      .leftJoinAndSelect('cart_items.cartId', 'cartId')
      .andWhere({ 'cartId.userId': userId })
      .getMany();
    // const smth = await this.userCarts.find({ relations: ['Cart']});
    // console.log('join?', smth);
    return cartWithData;
  }

  async createByUserId(userId: string) {
    const today = new Date();

    const randomCount = Math.floor(Math.random() * (15)) + 1;

    const cart = this.userCarts.create({ status: Statuses.OPEN, userId, createdAt: today, updatedAt: today });
    await this.userCarts.insert(cart);
    const createdCart = await this.userCarts.findOne({ where: { userId } });
    const cartItem = this.cartItems.create({ count: randomCount, cartId: createdCart });
    const createdCartItems = await this.cartItems.insert(cartItem);
    const items = await this.cartItems.findOne({ where: { cartId: cartItem.cartId }});
    console.log(createdCart);

    return { cart: createdCart, items };
  }

  async findOrCreateByUserId(userId: string): Promise<CartItems[]> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }
    const { items } = await this.createByUserId(userId)
    return [items];
  }

  async updateByUserId(userId: string, { status }: Cart): Promise<CartItems[]> {
    await this.userCarts.update({ userId }, { status})
    const newCart = await this.findByUserId(userId);
    // console.log('newCart', newCart);
    return newCart;
  }

  async removeByUserId(userId): Promise<void> {
    await this.userCarts.delete({ userId });
  }

}
