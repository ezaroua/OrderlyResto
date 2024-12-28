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
const router = express.Router();

/**
 * Routes d'accès aux restaurants
 */
router.get('/shop/:id', shopGetOne);
router.get('/shop/', shopGetAll);
router.post('/shop/', shopCreate);
router.put('/shop/:id', shopUpdate);
router.patch('/shop/:id', shopPatch);
router.delete('/shop/:id', shopDelete);
router.put('/shop/rate/:id', shopRate);

export default router;