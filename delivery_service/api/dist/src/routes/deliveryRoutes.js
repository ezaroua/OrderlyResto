"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryController_1 = require("../controllers/deliveryController");
const router = express_1.default.Router();
/**
 * Routes d'accès aux utilisateurs
 */
router.get('/delivery/:id', deliveryController_1.deliveryGetOne);
router.get('/delivery/', deliveryController_1.deliveryGetAll);
exports.default = router;
//# sourceMappingURL=deliveryRoutes.js.map