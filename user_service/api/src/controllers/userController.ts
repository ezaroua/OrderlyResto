import { pool } from '../../connectionDb';
import { UserInterface, rowToUserInterface, UserVerificationStatus } from "../models/userModel";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import express from 'express';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Nombre de rounds pour le hashage

/** Création d'un utilisateur */
const userCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        console.log('Request body:', request.body);

        const { email, password, role_id } = request.body;

        if (!email || !password || !role_id) {
            response.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
            return;
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const connection = await pool.getConnection();

        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)',
            [email, hashedPassword, role_id]
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

/** Mise à jour d'un utilisateur avec option de mise à jour du mot de passe */
const userUpdate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const user_id = request.params.id;
        const { email, password, role_id } = request.body;

        if (!email || !role_id) {
            response.status(400).json({ message: 'Email et role_id sont obligatoires.' });
            return;
        }

        const connection = await pool.getConnection();

        const [existingUserRows] = await connection.execute<RowDataPacket[]>(
            'SELECT * FROM users WHERE user_id = ?',
            [user_id]
        );

        if (existingUserRows.length === 0) {
            connection.release();
            response.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        let query = 'UPDATE users SET email = ?, role_id = ?, updated_at = CURRENT_TIMESTAMP';
        let params: any[] = [email, role_id];

        // Si un nouveau mot de passe est fourni, le hasher et l'ajouter à la mise à jour
        if (password) {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            query += ', password = ?';
            params.push(hashedPassword);
        }

        query += ' WHERE user_id = ?';
        params.push(user_id);

        const [result] = await connection.execute<ResultSetHeader>(query, params);

        connection.release();

        if (result.affectedRows > 0) {
            response.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
        } else {
            response.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
    } catch (error) {
        console.error('Error in userUpdate:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        } else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
};

/** Ajout d'une fonction pour vérifier le mot de passe */
const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
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




/** Suppression d'un utilisateur */
const userDelete = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const id = request.params.id;

        const connection = await pool.getConnection();

        // Vérifier si l'utilisateur existe avant de le supprimer
        const [existingUserRows] = await connection.execute<RowDataPacket[]>(
            'SELECT * FROM users WHERE user_id = ?',
            [id]
        );

        if (existingUserRows.length === 0) {
            connection.release();
            response.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        // Suppression de l'utilisateur
        const [result] = await connection.execute<ResultSetHeader>(
            'DELETE FROM users WHERE user_id = ?',
            [id]
        );

        connection.release();

        if (result.affectedRows > 0) {
            response.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            response.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
        }
    } catch (error) {
        console.error('Error in userDelete:', error);
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erreur serveur', error: error.message });
        } else {
            response.status(500).json({ message: 'Erreur serveur', error: 'Erreur inconnue' });
        }
    }
};


/** 
 * Vérifie l'existence d'un utilisateur et la validité de son mot de passe
 */
const verifyUser = async (email: string, password: string): Promise<{ 
    status: UserVerificationStatus; 
    user?: UserInterface;
    message: string;
}> => {
    try {
        if (!email || !password) {
            return {
                status: UserVerificationStatus.INVALID_INPUT,
                message: "Email et mot de passe requis"
            };
        }

        const connection = await pool.getConnection();

        const [rows] = await connection.execute<RowDataPacket[]>(
            `SELECT users.*, roles.name AS role_name 
             FROM users 
             LEFT JOIN roles ON users.role_id = roles.id 
             WHERE users.email = ?`,
            [email]
        );

        connection.release();

        if (rows.length === 0) {
            return {
                status: UserVerificationStatus.INVALID_EMAIL,
                message: "Email non trouvé"
            };
        }

        const user = rows[0];

        const passwordMatch = await verifyPassword(password, user.password);

        if (!passwordMatch) {
            return {
                status: UserVerificationStatus.INVALID_PASSWORD,
                message: "Mot de passe incorrect"
            };
        }

        return {
            status: UserVerificationStatus.SUCCESS,
            user: rowToUserInterface(user),
            message: "Authentification réussie"
        };

    } catch (error) {
        console.error('Error in verifyUser:', error);
        return {
            status: UserVerificationStatus.SERVER_ERROR,
            message: error instanceof Error ? error.message : "Erreur serveur inconnue"
        };
    }
};

export { userGetOne, userGetAll, userCreate, userUpdate, userDelete, verifyUser, verifyPassword };