"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
//import * as config from './config.json';
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const deliveryRoutes_1 = __importDefault(require("./src/routes/deliveryRoutes"));
const app = (0, express_1.default)();
const portHost = process.env.PORT;
console.log(portHost);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(deliveryRoutes_1.default);
app.post('/', (request, response) => {
    response.send(request.body);
});
app.get('/', (request, response) => {
    response.send('delivery service');
});
app.listen(portHost);
//# sourceMappingURL=app.js.map