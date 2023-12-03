import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import bodyParser from 'body-parser';
import { logger } from "./middlewares/logger";

export const app = express();

app.use(cors());
app.use(bodyParser.json());

const swaggerDocument = YAML.load("./swagger.yaml");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', logger);
// app.use('/api/profile/', profileRouter);
const productController = require('./controllers/productController');
const loginController = require('./controllers/loginController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');

app.use('/api/products', productController);
// app.use('/api/login', loginController);
app.use('/api/profile/cart', cartController);
app.use('/api/profile/cart/checkout', orderController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})
