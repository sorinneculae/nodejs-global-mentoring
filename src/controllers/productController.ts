import express, { Response } from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { products } from "../dataAccess/products";
import { findProduct } from "../services/products.service";
import { errorLogger } from "../middlewares/errorLogger";
const router = express.Router();

router.get('/', authenticateJWT, errorLogger, (req: any, res: Response) => {
  res.status(200).send({ data: products });
})

router.get('/:productId', authenticateJWT, (req: any, res: Response) => {
  const { productId } = req.params;
  const product = findProduct(productId);
  if (product) {
    res.status(200).send({ data: product });
  } else {
    res.status(404).send({
      data: null,
      error: {
        message: 'No product with such id'
      }
    });
  }
})

module.exports = router;
