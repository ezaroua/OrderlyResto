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
router.put('/rating/:id', deliveryController_1.rateDelivery);
router.post('/register/', deliveryController_1.registerDelivery);
router.put('/update/:id', deliveryController_1.updateDelivery);
exports.default = router;
//# sourceMappingURL=deliveryRoutes.js.map