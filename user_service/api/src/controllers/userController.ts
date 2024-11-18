import { pool } from '../../connectionDb';
import { UserInterface, rowToUserInterface } from "../models/userModel";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import express from 'express';

/** Création d'un utilisateur */
const userCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        console.log('Request body:', request.body);

        const { first_name, last_name, username, email, password, phone, role_id } = request.body;

        if (!first_name || !last_name || !username || !email || !password || !role_id) {
            response.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
            return;
        }

        const connection = await pool.getConnection();

        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO users (first_name, last_name, username, email, password, phone, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, username, email, password, phone || null, role_id]
        );

        connection.release();

        if (result.affectedRows > 0) {
            response.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.insertId });
        } else {
            response.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
        }
    } catch (error) {
        console.error('Error in userCreate:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        } else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
};

/** Recherche d'un utilisateur */
const userGetOne = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const connection = await pool.getConnection();
        const id = request.params.id;

        const [rows] = await connection.execute<RowDataPacket[]>(
            `SELECT users.*, roles.name AS role_name FROM users
             LEFT JOIN roles ON users.role_id = roles.id WHERE users.id = ?`,
            [id]
        );

        connection.release();

        if (rows.length === 0) {
            response.status(404).json({ message: 'Utilisateur non trouvé' });
        } else {
            const user = rowToUserInterface(rows[0]);
            response.status(200).json(user);
        }
    } catch (error) {
        console.error('Error in userGetOne:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        } else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
};

/** Liste de tous les utilisateurs */
const userGetAll = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute<RowDataPacket[]>(
            `SELECT users.*, roles.name AS role_name FROM users
             LEFT JOIN roles ON users.role_id = roles.id`
        );

        connection.release();

        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun utilisateur trouvé' });
        } else {
            const users: UserInterface[] = rows.map(row => rowToUserInterface(row));
            response.status(200).json(users);
        }
    } catch (error) {
        console.error('Error in userGetAll:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        } else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
};

export { userGetOne, userGetAll, userCreate };
