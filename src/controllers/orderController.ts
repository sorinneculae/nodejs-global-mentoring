import express from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { emptyCartItems, findCartByUserId } from "../services/carts.service";
import { errorLogger } from "../middlewares/errorLogger";
import { createOrder } from "../services/orders.service";
const router = express.Router();

router.post("/", authenticateJWT, errorLogger, (req: any, res: any) => {
  const cart = findCartByUserId(res.userId);
  if (cart) {
    if (cart.items.length) {
      const order = createOrder(cart, res.userId);
      emptyCartItems(res.userId);
      res.status(200).send({ data: order })
    } else {
      res.status(404).send({
        data: null,
        error: {
          message: "Cart is empty"
        },
      });
    }
  } else {
    res.status(404).send({
      data: null,
      error: {
        message: "Cart was not found"
      },
    });
  }
})

module.exports = router;
