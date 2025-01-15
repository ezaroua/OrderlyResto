"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryController_1 = require("../controllers/deliveryController");
const authMiddleWare_1 = require("../../middleWares/authMiddleWare");
const router = express_1.default.Router();
/**
 * Routes d'accès aux utilisateurs
 */
router.get('/delivery/:id', authMiddleWare_1.checkApiKey, deliveryController_1.deliveryGetOne);
router.get('/delivery/', authMiddleWare_1.checkApiKey, deliveryController_1.deliveryGetAll); // A supprimer
router.put('/rating/:id', authMiddleWare_1.checkApiKey, deliveryController_1.rateDelivery);
router.post('/register/', authMiddleWare_1.checkApiKey, deliveryController_1.registerDelivery);
router.put('/update/:id', authMiddleWare_1.checkApiKey, deliveryController_1.updateDelivery);
router.delete('/delivery/:id', authMiddleWare_1.checkApiKey, deliveryController_1.deleteDelivery); // A supprimer
exports.default = router;
//# sourceMappingURL=deliveryRoutes.js.map