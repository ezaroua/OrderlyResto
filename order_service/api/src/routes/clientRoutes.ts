import express from 'express';
import { 
    clientGetOne, 
    clientGetAll, 
    clientCreate, 
    clientUpdate, 
    clientPatch, 
    clientDelete 
} from "../controllers/clientController";
import {checkApiKey} from "../../middleWares/authMiddleWare";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/clients/:id',checkApiKey, clientGetOne);
router.get('/clients/',checkApiKey, clientGetAll);
router.post('/clients/',checkApiKey, clientCreate);
router.put('/clients/:id',checkApiKey, clientUpdate);
router.patch('/clients/:id',checkApiKey, clientPatch);
router.delete('/clients/:id',checkApiKey, clientDelete);

export default router;