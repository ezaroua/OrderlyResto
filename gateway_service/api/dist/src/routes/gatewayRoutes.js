"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utilisateurController_1 = require("../controllers/utilisateurController");
const auth_middlewares_1 = require("../middleWares/auth-middlewares");
const router = express_1.default.Router();
/**
 * Routes d'accès aux utilisateurs
 */
/**Routes pour login*/
router.post('/login', utilisateurController_1.userConnexion);
router.post('/create', utilisateurController_1.userCreate);
router.delete('/:id', auth_middlewares_1.checkTokenValid, utilisateurController_1.userDelete);
exports.default = router;
//# sourceMappingURL=gatewayRoutes.js.map