import express from 'express';
import {userGetOne, userGetAll, userCreate, userUpdate, userDelete, verifyUser} from '../controllers/userController';
import {checkApiKey} from "../middleWares/authMiddleWare";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', checkApiKey, userGetOne); // Récupérer un utilisateur par ID
router.get('/users/', checkApiKey, userGetAll);    // Récupérer tous les utilisateurs
router.post('/users', checkApiKey, userCreate);     // Créer un nouvel utilisateur
router.put('/users/:id', checkApiKey, userUpdate);   //mise à jours les info d'utilisateur
router.delete('/users/:id', checkApiKey, userDelete);  //Supprimer un utilisateur
router.post('/users/connexion', checkApiKey, verifyUser)

export default router;
