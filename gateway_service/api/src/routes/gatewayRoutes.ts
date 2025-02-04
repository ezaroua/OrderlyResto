import express from 'express';
import {userConnexion, userCreate, userDelete, userUpdate} from "../controllers/utilisateurController";
import {checkTokenValid} from "../middleWares/auth-middlewares";
import {getAllRestaurant, getRestaurant} from "../controllers/restaurantController";
import {createOrder, getAllOrder, getOrder, ratingOrder, updateOrder} from "../controllers/commandeController";
import {getDelivery} from "../controllers/livraisonController";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
/**Routes pour les utilisateurs*/
router.post('/login',userConnexion);
router.post('/create', userCreate);
router.delete('/:id',checkTokenValid, userDelete)
router.put('/:id',checkTokenValid,userUpdate)

/**Routes pour les restaurants*/
router.get('/shop',checkTokenValid,getAllRestaurant)
router.get('/shop/:id',checkTokenValid,getRestaurant)


/**Routes pour les commandes*/
router.get('/orders/all/:id/:roleId',checkTokenValid,getAllOrder)
router.get('/orders/:id',checkTokenValid,getOrder)
router.post('/orders',checkTokenValid,createOrder)
router.put('/orders/:id',checkTokenValid,updateOrder)
router.post('/rating',checkTokenValid,ratingOrder)


/**Routes pour les livreurs*/
router.get('/delivery/:id',checkTokenValid,getDelivery)


export default router;