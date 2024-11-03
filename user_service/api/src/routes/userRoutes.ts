import express from 'express';
import {userGetOne, userGetAll} from "../controllers/userController";
import {checkApiKey} from "../../middleWares/authMiddleWare";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', checkApiKey, userGetOne);
router.get('/users/', checkApiKey, userGetAll);

export default router;