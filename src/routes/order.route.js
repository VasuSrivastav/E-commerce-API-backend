import express from 'express';
import { body, validationResult } from 'express-validator';
import authenticateJWT from '../middlewares/auth.middleware.js';
import { addOrder, updateOrder, viewOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', authenticateJWT, viewOrder);

router.post('/', authenticateJWT, addOrder);

router.put('/:id',authenticateJWT, updateOrder);


// router.

export default router;