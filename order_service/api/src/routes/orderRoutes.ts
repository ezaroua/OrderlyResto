import express from 'express';
import { orderGetOne, orderGetAll } from "../controllers/orderController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/orders/:id', orderGetOne);
router.get('/orders/', orderGetAll);

export default router;