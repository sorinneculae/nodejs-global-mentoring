import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { products } from "./products";

export const carts: CartEntity[] = [
  {
    id: "1434fec6-cd85-420d-95c0-eee2301a971d",
    userId: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
    isDeleted: false,
    items: [
      {
        product: {
          id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
          title: "Book",
          description: "Interesting book",
          price: 200,
        },
        count: 2,
      },
      {
        product: {
          id: "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
          title: "Pen",
          description: "Cute pen",
          price: 20,
        },
        count: 3,
      },
    ],
  },
];
