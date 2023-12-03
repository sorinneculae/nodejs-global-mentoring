import express, { Request } from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { createCart, findCartByUserId, removeCartFromUser, updateCart } from "../services/carts.service";
import { errorLogger } from "../middlewares/errorLogger";
const router = express.Router();

router.get("/", authenticateJWT, errorLogger, (req: any, res: any) => {
  const cart = findCartByUserId(res.userId);
  if (cart) {
    res.status(200).send({ data: cart });
  } else {
    const userCart = createCart(res.userId);
    res.status(404).send({
      data: null,
      error: {
        message: `No cart found for the current user. New cart with id ${ userCart.id } was created for user ${ res.userId }`
      },
    });
  }
});

router.put("/", authenticateJWT, errorLogger, (req: Request, res: any) => {
  const cart = findCartByUserId(res.userId);
  if (cart) {
    const response = updateCart(cart, req.body, res);
    const { status, message } = response;
    if (status && status !== 200) {
      res.status(status).send({
        data: null,
        error: { message },
      });
    } else {
      res.status(200).send({ data: response });
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

router.delete('/', authenticateJWT, errorLogger, (req: any, res: any) => {
  if (removeCartFromUser(res.userId)) {
    res.status(200).send({
      data: {
        success: true
      },
      error: null
    });
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
