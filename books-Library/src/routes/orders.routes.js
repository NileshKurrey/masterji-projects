import express from 'express'
import { isUserLoggedIn } from '../middlewares/UserValidator.middleware.js'
import {placeOrder,listUserOrders,getOrderDetails} from '../controllers/orders.controller.js'

const router = express.Router();

router.post('/', isUserLoggedIn, placeOrder);
router.get('/', isUserLoggedIn, listUserOrders);
router.get('/:orderId', isUserLoggedIn, getOrderDetails);

export default router;
