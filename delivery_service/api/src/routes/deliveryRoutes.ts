import express from 'express';
import { deliveryGetOne, deliveryGetAll, rateDelivery, registerDelivery, updateDelivery } from "../controllers/deliveryController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/delivery/:id', deliveryGetOne);
router.get('/delivery/', deliveryGetAll);
router.put('/rating/:id', rateDelivery);
router.post('/register/', registerDelivery);
router.put('/update/:id', updateDelivery);
export default router;