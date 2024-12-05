"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
/**
 * Routes d'accès aux utilisateurs
 */
router.get('/users/:id', userController_1.userGetOne); // Récupérer un utilisateur par ID
router.get('/users', userController_1.userGetAll); // Récupérer tous les utilisateurs
router.post('/users', userController_1.userCreate); // Créer un nouvel utilisateur
router.put('/users/:id', userController_1.userUpdate);
router.delete('/users/:id', userController_1.userDelete);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map