import express from 'express';
import { userGetOne, userGetAll, userCreate } from '../controllers/userController';

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', userGetOne); // Récupérer un utilisateur par ID
router.get('/users', userGetAll);      // Récupérer tous les utilisateurs
router.post('/users', userCreate);     // Créer un nouvel utilisateur

export default router;
