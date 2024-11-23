import express from 'express';
import { 
    clientGetOne, 
    clientGetAll, 
    clientCreate, 
    clientUpdate, 
    clientPatch, 
    clientDelete 
} from "../controllers/clientController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/clients/:id', clientGetOne);
router.get('/clients/', clientGetAll);
router.post('/clients/', clientCreate);
router.put('/clients/:id', clientUpdate);
router.patch('/clients/:id', clientPatch);
router.delete('/clients/:id', clientDelete);

export default router;