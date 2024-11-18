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
router.get('/users/:id', userController_1.userGetOne);
router.get('/users/', userController_1.userGetAll);
router.post('/users/', userController_1.userCreate);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map