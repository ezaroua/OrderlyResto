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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userUpdate = exports.userCreate = exports.userGetAll = exports.userGetOne = void 0;
const connectionDb_1 = require("../../connectionDb");
const userModel_1 = require("../models/userModel");
/** Création d'un utilisateur */
const userCreate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request body:', request.body);
        const { first_name, last_name, username, email, password, phone, role_id } = request.body;
        if (!first_name || !last_name || !username || !email || !password || !role_id) {
            response.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
            return;
        }
        const connection = yield connectionDb_1.pool.getConnection();
        const [result] = yield connection.execute('INSERT INTO users (first_name, last_name, username, email, password, phone, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [first_name, last_name, username, email, password, phone || null, role_id]);
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
/** Mise à jour d'un utilisateur */
const userUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const { first_name, last_name, username, email, phone, role_id } = request.body;
        // Vérification des champs obligatoires
        if (!first_name || !last_name || !username || !email || !role_id) {
            response.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
            return;
        }
        const connection = yield connectionDb_1.pool.getConnection();
        // Vérifier si l'utilisateur existe avant de le mettre à jour
        const [existingUserRows] = yield connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (existingUserRows.length === 0) {
            connection.release();
            response.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        // Mise à jour de l'utilisateur
        const [result] = yield connection.execute('UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, phone = ?, role_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [first_name, last_name, username, email, phone || null, role_id, id]);
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
/** Suppression d'un utilisateur */
const userDelete = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const connection = yield connectionDb_1.pool.getConnection();
        // Vérifier si l'utilisateur existe avant de le supprimer
        const [existingUserRows] = yield connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (existingUserRows.length === 0) {
            connection.release();
            response.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        // Suppression de l'utilisateur
        const [result] = yield connection.execute('DELETE FROM users WHERE id = ?', [id]);
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