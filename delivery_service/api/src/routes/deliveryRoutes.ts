import express from 'express';
import { deliveryGetOne, deliveryGetAll, rateDelivery } from "../controllers/deliveryController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/delivery/:id', deliveryGetOne);
router.get('/delivery/', deliveryGetAll);
router.put('/rating/:id', rateDelivery)

export default router;