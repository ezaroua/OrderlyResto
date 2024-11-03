import express from 'express';
import { userGetOne, userGetAll } from "../controllers/utilisateurController";
const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', userGetOne);
router.get('/users/', userGetAll);

export default router;