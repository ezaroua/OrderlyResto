let express = require('express');
let { userGetOne, userGetAll } = require("../controllers/userController");

const router = express.Router();

/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', userGetOne);
router.get('/users/', userGetAll);

export default router;