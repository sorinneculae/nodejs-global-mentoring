import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { productsMock } from "./productsMock";

const cartItem1: CartItemEntity = {
  product: productsMock[0],
  count: 2,
};

const cartItem2: CartItemEntity = {
  product: productsMock[1],
  count: 3,
};

export const cartsMock: CartEntity[] = [
  {
    id: "1434fec6-cd85-420d-95c0-eee2301a971d",
    userId: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    isDeleted: false,
    items: [cartItem1, cartItem2],
  },
];
