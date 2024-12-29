"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
require('dotenv').config();
const pool = promise_1.default.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined
});
exports.pool = pool;
//# sourceMappingURL=connectionDb.js.map