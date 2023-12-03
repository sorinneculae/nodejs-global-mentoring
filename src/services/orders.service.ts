import { CartEntity } from "../models/cart.entity";
import { v4 as uuidv4 } from "uuid";

export const createOrder = (cart: CartEntity, userId: string) => {
  return {
    id: uuidv4(),
    userId,
    cartId: cart.id,
    items: [ ...cart.items ], 
    payment: {
      type: 'paypal',
      address: 'Brasov',
      creditCard: undefined
    },
    delivery: {
      type: 'post',
      address: undefined
    },
    comments: '',
    status: 'created',
    total: cart.items.reduce((acc, current) => acc + (current.product.price * current.count), 0)
  }
};
