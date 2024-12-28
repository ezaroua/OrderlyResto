import express from 'express';
import {userConnexion, userCreate, userDelete} from "../controllers/utilisateurController";
import {checkTokenValid} from "../middleWares/auth-middlewares";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
/**Routes pour login*/
router.post('/login', userConnexion);
router.post('/create', userCreate);
router.delete('/:id', userDelete)


export default router;