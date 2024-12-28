import express from 'express';
import {
    productGetOne,
    productGetAll,
    productCreate,
    productUpdate,
    productPatch,
    productDelete
} from "../controllers/productController";
const router = express.Router();

/**
 * Routes d'accès aux restaurants
 */
router.get('/product/:id', productGetOne);
router.get('/product/', productGetAll);
router.post('/product/', productCreate);
router.put('/product/:id', productUpdate);
router.patch('/product/:id', productPatch);
router.delete('/product/:id', productDelete);

export default router;