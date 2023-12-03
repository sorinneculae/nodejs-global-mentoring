import { carts } from "../dataAccess/carts";
import { CartEntity, CartItemEntity } from "../models/cart.entity";
import { v4 as uuidv4 } from "uuid";
import { ProductEntity } from "../models/product.entity";
import { findProduct } from "./products.service";
import { Response } from "express";
import Joi from "joi";

export const createCart = (userId: string) => {
  const userCart = {
    id: uuidv4(),
    userId: userId,
    isDeleted: false,
    items: [],
  };
  carts.push(userCart);
  return userCart;
}

export const findCartByUserId = (userId: string) => {
  return carts.find((cart: CartEntity) => cart.userId === userId);
}

export const findCartIndexByUserId = (userId: string) => {
  return carts.findIndex((cart: CartEntity) => cart.userId === userId);
}

export const findProductInCart = (cart: CartEntity, productId: string): CartItemEntity | undefined => {
  return cart?.items?.find((item: CartItemEntity) => item.product.id === productId);
}

export const findProductIndexInCart = (cart: CartEntity, productId: string): number => {
  return cart?.items?.findIndex((item: CartItemEntity) => item.product.id === productId);
}

export const addProductInCart = (cart: CartEntity, product: ProductEntity, count: number) => {
  cart.items.push( {product, count: count || 1 });
  return cart;
}

export const removeProductFromCart = (cart: CartEntity, productId: string) => {
  const productIndexInCart = findProductIndexInCart(cart, productId);
  cart.items.splice(productIndexInCart, 1);
  return cart;
}

export const updateCart = (cart: CartEntity, body: any, res: Response): any => {
  let cartItem: CartItemEntity | undefined = findProductInCart(cart, body.productId);
  const { productId, count } = body;

  const schema = Joi.object({
    productId: Joi.string()
      .uuid()
      .required(),

    count: Joi.number()
      .integer()
      .required()
  });
  const validation = schema.validate({ ...body });
  if (validation.error) {
    return { status: 400, message: validation.error };
  }

  if (cartItem) {
    if (count < 1) {
      return removeProductFromCart(cart, productId);
    } else {
      cartItem.count = count;
    }
    return cart;
  } else {
    const product: ProductEntity | undefined = findProduct(productId);
    if (product) {
      return addProductInCart(cart, product, count);
    } else {
      return { status: 404, message: "Product not found in the shop or in cart" };
    }
  }
}

export const removeCartFromUser = (userId: string) => {
  const cartIndex = findCartIndexByUserId(userId);
  if (cartIndex !== -1) {
    carts.splice(cartIndex, 1);
    return true;
  }
}

export const emptyCartItems = (userId: string) => {
  const cart = findCartByUserId(userId);
  if (cart) {
    cart.items = [];
  }
}
