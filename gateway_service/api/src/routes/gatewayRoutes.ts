import express from 'express';
import {userConnexion, userCreate, userDelete, userUpdate} from "../controllers/utilisateurController";
import {checkTokenValid} from "../middleWares/auth-middlewares";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
/**Routes pour login*/
router.post('/login',userConnexion);
router.post('/create', userCreate);
router.delete('/:id',checkTokenValid, userDelete)
router.put('/update/:id',checkTokenValid,userUpdate)


export default router;