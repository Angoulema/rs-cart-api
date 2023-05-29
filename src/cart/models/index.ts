import { Statuses } from "../../database/entities/cart.entity";

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  productId: string,
  count: number,
}

export type Cart = {
  id: string,
  userId: string,
  status: Statuses,
  items: CartItem[],
}
