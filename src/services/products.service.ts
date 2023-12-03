import { products } from "../dataAccess/products";
import { ProductEntity } from "../models/product.entity";
import { v4 as uuidv4 } from "uuid";

export const findProduct = (productId: string): ProductEntity | undefined => {
  return products.find((prod: ProductEntity) => prod.id === productId);
}

export const createProduct = (product: ProductEntity) => {
  product.id = uuidv4();
  products.push(product);
  return product;
}