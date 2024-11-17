import express from 'express';
import { clientGetOne, clientGetAll } from "../controllers/clientController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/clients/:id', clientGetOne);
router.get('/clients/', clientGetAll);

export default router;