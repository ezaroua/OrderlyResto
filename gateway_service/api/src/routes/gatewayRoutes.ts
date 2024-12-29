import express from 'express';
import {userConnexion, userCreate, userDelete, userUpdate} from "../controllers/utilisateurController";
import {checkTokenValid} from "../middleWares/auth-middlewares";
import {getAllRestaurant, getRestaurant} from "../controllers/restaurantController";
import {getAllOrder, getOrder} from "../controllers/livraisonController";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
/**Routes pour les utilisateurs*/
router.post('/login',userConnexion);
router.post('/create', userCreate);
router.delete('/:id',checkTokenValid, userDelete)
router.put('/update/:id',checkTokenValid,userUpdate)

/**Routes pour les restaurants*/
router.get('/shop',checkTokenValid,getAllRestaurant)
router.get('/shop/:id',checkTokenValid,getRestaurant)


/**Routes pour les commandes*/
router.get('/orders',checkTokenValid,getAllOrder)
router.get('/orders/:id',checkTokenValid,getOrder)

export default router;