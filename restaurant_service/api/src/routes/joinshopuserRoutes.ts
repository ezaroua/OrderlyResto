import {checkApiKey} from "../../middleWares/authMiddleWare";
import express from "express";
import {userGetOne, userCreate, userUpdate} from "../controllers/joinshoperuser";
const router = express.Router();


/**Recuperation du restaurateur**/
router.get('/user/:id',checkApiKey, userGetOne);

/**Creation du restaurateur**/
router.post('/user',checkApiKey, userCreate);

/**Maj du restaurateur**/
router.put('/user/:id',checkApiKey,userUpdate);

export default router;