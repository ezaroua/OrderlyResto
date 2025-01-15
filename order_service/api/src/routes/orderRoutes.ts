import express from 'express';
import { 
    orderGetOne, 
    orderGetAll, 
    orderCreate, 
    orderUpdate, 
    orderPatch,
    orderDelete 
} from "../controllers/orderController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/orders/:id', orderGetOne);
router.get('/orders', orderGetAll);
router.post('/orders', orderCreate);
router.put('/orders/:id', orderUpdate);
router.patch('/orders/:id', orderPatch);
router.delete('/orders/:id', orderDelete);

export default router;