import express from 'express';
import placeOrder from '../controllers/placeOrder.controller.js';
import fetchOrders from '../controllers/fetchOrders.controller.js';
import auth from '../middlewares/auth.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/', auth, placeOrder);
orderRouter.get('/', auth, fetchOrders);

export default orderRouter;

