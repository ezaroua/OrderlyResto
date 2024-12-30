import express from 'express';
import {
    productGetOne,
    productGetAll,
    productCreate,
    productUpdate,
    productPatch,
    productDelete
} from "../controllers/productController";
import {checkApiKey} from "../../middleWares/authMiddleWare";
const router = express.Router();

/**
 * Routes d'accès aux restaurants
 */
router.get('/product/:id',checkApiKey, productGetOne);
router.get('/product/shop/:id',checkApiKey, productGetAll);
router.post('/product/',checkApiKey, productCreate);
router.put('/product/:id',checkApiKey, productUpdate);
router.patch('/product/:id',checkApiKey, productPatch);
router.delete('/product/:id',checkApiKey, productDelete);

export default router;