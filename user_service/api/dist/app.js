"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
// Charger les variables d'environnement
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware global
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use(userRoutes_1.default);
// Définir le port à partir des variables d'environnement ou utiliser 5001 par défaut
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map