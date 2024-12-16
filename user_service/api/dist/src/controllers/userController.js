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
exports.verifyPassword = exports.userDelete = exports.userUpdate = exports.userCreate = exports.userGetAll = exports.userGetOne = void 0;
const connectionDb_1 = require("../../connectionDb");
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10; // Nombre de rounds pour le hashage
/** Création d'un utilisateur */
const userCreate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request body:', request.body);
        const { email, password, role_id } = request.body;
        if (!email || !password || !role_id) {
            response.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
            return;
        }
        // Hashage du mot de passe
        const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        const connection = yield connectionDb_1.pool.getConnection();
        const [result] = yield connection.execute('INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)', [email, hashedPassword, role_id]);
        connection.release();
        if (result.affectedRows > 0) {
            response.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.insertId });
        }
        else {
            response.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
        }
    }
    catch (error) {
        console.error('Error in userCreate:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
        else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
});
exports.userCreate = userCreate;
/** Mise à jour d'un utilisateur avec option de mise à jour du mot de passe */
const userUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = request.params.id;
        const { email, password, role_id } = request.body;
        if (!email || !role_id) {
            response.status(400).json({ message: 'Email et role_id sont obligatoires.' });
            return;
        }
        const connection = yield connectionDb_1.pool.getConnection();
        const [existingUserRows] = yield connection.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);
        if (existingUserRows.length === 0) {
            connection.release();
            response.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        let query = 'UPDATE users SET email = ?, role_id = ?, updated_at = CURRENT_TIMESTAMP';
        let params = [email, role_id];
        // Si un nouveau mot de passe est fourni, le hasher et l'ajouter à la mise à jour
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            query += ', password = ?';
            params.push(hashedPassword);
        }
        query += ' WHERE user_id = ?';
        params.push(user_id);
        const [result] = yield connection.execute(query, params);
        connection.release();
        if (result.affectedRows > 0) {
            response.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
        }
        else {
            response.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
    }
    catch (error) {
        console.error('Error in userUpdate:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
        else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
});
exports.userUpdate = userUpdate;
/** Ajout d'une fonction pour vérifier le mot de passe */
const verifyPassword = (plainPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(plainPassword, hashedPassword);
});
exports.verifyPassword = verifyPassword;
/** Recherche d'un utilisateur */
const userGetOne = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield connectionDb_1.pool.getConnection();
        const id = request.params.id;
        const [rows] = yield connection.execute(`SELECT users.*, roles.name AS role_name FROM users
             LEFT JOIN roles ON users.role_id = roles.id WHERE users.id = ?`, [id]);
        connection.release();
        if (rows.length === 0) {
            response.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        else {
            const user = (0, userModel_1.rowToUserInterface)(rows[0]);
            response.status(200).json(user);
        }
    }
    catch (error) {
        console.error('Error in userGetOne:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
        else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
});
exports.userGetOne = userGetOne;
/** Liste de tous les utilisateurs */
const userGetAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield connectionDb_1.pool.getConnection();
        const [rows] = yield connection.execute(`SELECT users.*, roles.name AS role_name FROM users
             LEFT JOIN roles ON users.role_id = roles.id`);
        connection.release();
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }
        else {
            const users = rows.map(row => (0, userModel_1.rowToUserInterface)(row));
            response.status(200).json(users);
        }
    }
    catch (error) {
        console.error('Error in userGetAll:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
        else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
});
exports.userGetAll = userGetAll;
/** Suppression d'un utilisateur */
const userDelete = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const connection = yield connectionDb_1.pool.getConnection();
        // Vérifier si l'utilisateur existe avant de le supprimer
        const [existingUserRows] = yield connection.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        if (existingUserRows.length === 0) {
            connection.release();
            response.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        // Suppression de l'utilisateur
        const [result] = yield connection.execute('DELETE FROM users WHERE user_id = ?', [id]);
        connection.release();
        if (result.affectedRows > 0) {
            response.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        }
        else {
            response.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
        }
    }
    catch (error) {
        console.error('Error in userDelete:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
        else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
});
exports.userDelete = userDelete;
//# sourceMappingURL=userController.js.map