import express from 'express';
import {
    shopGetOne,
    shopGetAll,
    shopCreate,
    shopUpdate,
    shopPatch,
    shopDelete,
    shopRate
} from "../controllers/shopController";
import {checkApiKey} from "../../middleWares/authMiddleWare";
const router = express.Router();

/**
 * Routes d'accès aux restaurants
 */
router.get('/shop/:id',checkApiKey, shopGetOne);
router.get('/shop/',checkApiKey, shopGetAll);
router.post('/shop/',checkApiKey, shopCreate);
router.put('/shop/:id',checkApiKey, shopUpdate);
router.patch('/shop/:id',checkApiKey, shopPatch);
router.delete('/shop/:id',checkApiKey, shopDelete);
router.put('/shop/rate/:id',checkApiKey, shopRate);

export default router;