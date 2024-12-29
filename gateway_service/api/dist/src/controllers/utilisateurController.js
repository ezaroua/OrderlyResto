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
exports.userDelete = exports.userCreate = exports.userConnexion = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
const userCreate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = request.body.email;
        const password = request.body.password;
        const roleId = request.body.role_id;
        const result = yield (0, axios_1.default)({
            method: 'post',
            url: `http://localhost:5002/users`,
            headers: { 'api-key': `${process.env.API_KEY}` },
            data: {
                email: email,
                password: password,
                role_id: roleId
            }
        });
        switch (request.body.role_id) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
        response.status(201).json({ body: 'Compte creer avec succes', user_id: result.data.user_id });
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            /**Renvoyer une réponse d'echec*/
            response.status(err.status).json(err.message);
        }
        else {
            /**Renvoyer une réponse d'echec*/
            response.status(500).json({ body: 'Erreur serveur' });
        }
    }
});
exports.userCreate = userCreate;
const userDelete = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        const result = yield (0, axios_1.default)({
            method: 'delete',
            url: `http://localhost:5002/users/${userId}`,
            headers: { 'api-key': `${process.env.API_KEY}` }
        });
        switch (request.body.role_id) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
        response.status(200).json("Utilisateur supprimé !");
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            /**Renvoyer une réponse d'echec*/
            response.status(err.status).json(err.message);
        }
        else {
            /**Renvoyer une réponse d'echec*/
            response.status(500).json({ body: 'Erreur serveur' });
        }
    }
});
exports.userDelete = userDelete;
const userConnexion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = request.body.email;
        const password = request.body.password;
        if (email && password) {
            const result = yield (0, axios_1.default)({
                method: 'post',
                url: `http://localhost:5002/users/connexion`,
                headers: { 'api-key': `${process.env.API_KEY}` },
                data: {
                    email: request.body.email,
                    password: request.body.password
                }
            });
            let userInfo;
            const roleId = result.data.user.role_id;
            const userId = result.data.user.user_id;
            switch (roleId) {
                case 1:
                    userInfo = yield (0, axios_1.default)({
                        method: 'get',
                        url: `http://localhost:5004/users/connexion`,
                        headers: { 'api-key': `${process.env.API_KEY}` }
                    });
                    break;
                case 2:
                    userInfo = yield (0, axios_1.default)({
                        method: 'get',
                        url: `http://localhost:5003/clients/${userId}`,
                        headers: { 'api-key': `${process.env.API_KEY}` }
                    });
                    break;
                case 3:
                    userInfo = yield (0, axios_1.default)({
                        method: 'get',
                        url: `http://localhost:5005/users/connexion`,
                        headers: { 'api-key': `${process.env.API_KEY}` }
                    });
                    break;
            }
            if (userInfo != null) {
                /**Si les mots de passes correspondent alors on genere un token pour une session de 1 heure*/
                const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
                const payload = {
                    user_email: email,
                    role_id: result.data.user.role_id,
                    user_id: result.data.user.user_id,
                    exp: expiration
                };
                const token = (0, jsonwebtoken_1.sign)(payload, process.env.SECRET_KEY);
                response.status(201).json({ token: token, userInfo: userInfo.data });
            }
            else {
                response.status(404).json({ message: 'Profil demandé introuvable' });
            }
        }
        else {
            response.status(403).json({ message: 'Email ou mots de passe manquant' });
        }
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            /**Renvoyer une réponse d'echec*/
            response.status(err.status).json(err.message);
        }
        else {
            /**Renvoyer une réponse d'echec*/
            response.status(500).json({ message: 'Erreur serveur' });
        }
    }
});
exports.userConnexion = userConnexion;
//# sourceMappingURL=utilisateurController.js.map