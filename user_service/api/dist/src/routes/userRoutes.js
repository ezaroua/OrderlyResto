"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleWare_1 = require("../middleWares/authMiddleWare");
const router = express_1.default.Router();
/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', authMiddleWare_1.checkApiKey, userController_1.userGetOne); // Récupérer un utilisateur par ID
router.get('/users/', authMiddleWare_1.checkApiKey, userController_1.userGetAll); // Récupérer tous les utilisateurs
router.post('/users', authMiddleWare_1.checkApiKey, userController_1.userCreate); // Créer un nouvel utilisateur
router.put('/users/:id', authMiddleWare_1.checkApiKey, userController_1.userUpdate); //mise à jours les info d'utilisateur
router.delete('/users/:id', authMiddleWare_1.checkApiKey, userController_1.userDelete); //Supprimer un utilisateur
router.post('/users/connexion', authMiddleWare_1.checkApiKey, userController_1.verifyUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map