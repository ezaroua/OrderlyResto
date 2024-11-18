import { pool } from '../../connectionDb';
import { UserInterface, rowToUserInterface } from "../models/userModel";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import express from 'express';

/** Création d'un utilisateur */
const userCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        console.log('Request body:', request.body); // Log pour vérifier les données reçues

        const { email, password, firstname, lastname } = request.body;

        // Validation des champs obligatoires
        if (!email || !password || !firstname || !lastname) {
            response.status(400).json({ message: 'Tous les champs sont requis' });
            return;
        }

        const connection = await pool.getConnection();

        // Insertion de l'utilisateur dans la base de données
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO user (email, password, firstname, lastname) VALUES (?, ?, ?, ?)',
            [email, password, firstname, lastname]
        );

        connection.release();

        if (result.affectedRows > 0) {
            response.status(201).json({ message: 'Utilisateur créé avec succès', id_user: result.insertId });
        } else {
            response.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
        }
    } catch (error) {
        console.error('Error in userCreate:', error); // Log des erreurs pour le débogage
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

        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user WHERE id_user = ?', [id]);

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

        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user');

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
