import express from 'express';
import { deliveryGetOne, deliveryGetAll } from "../controllers/deliveryController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/delivery/:id', deliveryGetOne);
router.get('/delivery/', deliveryGetAll);

export default router;