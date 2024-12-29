"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenValid = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/** Extraction du token*/
const extractToken = (authorization) => {
    if (typeof authorization !== 'string') {
        return false; // Vide retourn false
    }
    /**On isole le token*/
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    if (matches && matches[2]) {
        return matches[2];
    }
    else {
        return false;
    }
};
/** Verification du token*/
const checkTokenValid = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization && extractToken(request.headers.authorization);
    if (!token) {
        response.status(401).json({ message: 'Token non valide ou absent !' });
    }
    else {
        /**On verifie le token*/
        (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                response.status(401).json({ message: 'Bad token !' });
            }
            else {
                next();
            }
        });
    }
});
exports.checkTokenValid = checkTokenValid;
//# sourceMappingURL=auth-middlewares.js.map