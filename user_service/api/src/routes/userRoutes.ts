import express from 'express';
import { userGetOne, userGetAll, userCreate, userUpdate, userDelete } from '../controllers/userController';

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', userGetOne); // Récupérer un utilisateur par ID
router.get('/users', userGetAll);      // Récupérer tous les utilisateurs
router.post('/users', userCreate);     // Créer un nouvel utilisateur
router.put('/users/:id', userUpdate);   //mise à jours les info d'utilisateur
router.delete('/users/:id', userDelete);  //Supprimer un utilisateur
export default router;
