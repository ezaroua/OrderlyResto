import express from 'express';
import { 
    orderGetOne, 
    orderGetAll, 
    orderCreate, 
    orderUpdate, 
    orderPatch,
    orderDelete 
} from "../controllers/orderController";
import {checkApiKey} from "../../middleWares/authMiddleWare";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/orders/:id',checkApiKey, orderGetOne);
router.get('/orders/all/:id/:roleid',checkApiKey, orderGetAll);
router.post('/orders',checkApiKey, orderCreate);
router.put('/orders/:id',checkApiKey, orderUpdate);
router.patch('/orders/:id',checkApiKey, orderPatch);
router.delete('/orders/:id',checkApiKey, orderDelete);

export default router;