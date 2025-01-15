import express from 'express';
import {
    deliveryGetOne,
    deliveryGetAll,
    rateDelivery,
    registerDelivery,
    updateDelivery,
    deleteDelivery
} from "../controllers/deliveryController";
import {checkApiKey} from "../../middleWares/authMiddleWare";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/delivery/:id',checkApiKey, deliveryGetOne);
router.get('/delivery/',checkApiKey, deliveryGetAll); // A supprimer
router.put('/rating/:id',checkApiKey, rateDelivery);
router.post('/register/',checkApiKey, registerDelivery);
router.put('/update/:id',checkApiKey, updateDelivery);
router.delete('/delivery/:id',checkApiKey,deleteDelivery) // A supprimer

export default router;