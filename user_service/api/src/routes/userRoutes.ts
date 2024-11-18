import express from 'express';
import {userGetOne, userGetAll, userCreate} from "../controllers/userController";

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', userGetOne);
router.get('/users/', userGetAll);
router.post('/users/', userCreate);

export default router;
