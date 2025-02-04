import express from "express";
import {pool} from "../../connectionDb";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {rowToShopInterface} from "../models/shopModel";
import {rowToUserInterface, UserInterface} from "../models/userModel";

const userGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer un client*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM joinshopuser WHERE id_user = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({message: 'Restaurant non trouvé'});
        }else {

            /**Renvoyer une réponse de succès*/
            const user = rowToUserInterface(rows[0]);

            response.status(200).json(user);
        }

    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**
 * Create
 */
const userCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        console.log("test")
        /** Récupération des paramètres de la requête */
        const {
            id_shop,
            id_user,
            firstname,
            lastname,
        } = request.body;

        const user : UserInterface = {
            id_shop,
            id_user,
            firstname,
            lastname
        };
        console.log("test")
        /** Vérification des paramètres obligatoires */
        if (!id_shop || !id_user || !firstname || !lastname ) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Insertion en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO joinshopuser (id_shop, id_user, firstname, lastname) VALUES (?, ?, ?, ?)',
            [user.id_shop, user.id_user, user.firstname, user.lastname]
        );
        connection.release();

        /** Retour de la requête */
        response.status(201).json({ message: 'Restaurateur créé avec succès.', id_user: user.id_user });
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la création du restaurateur.' });
    }
};

/**
 * Create
 */
const userUpdate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
console.log("userUpdate")
        const id = request.params.id
        /** Récupération des paramètres de la requête */
        const {
            id_shop,
            id_user,
            firstname,
            lastname,
        } = request.body;

        const user : UserInterface = {
            id_shop,
            id_user,
            firstname,
            lastname
        };
        console.log("test")
        /** Vérification des paramètres obligatoires */
        if (!id_shop || !firstname || !lastname ) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Insertion en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'UPDATE joinshopuser SET firstname = ? , lastname = ? WHERE id_user = ?',
            [user.firstname, user.lastname, id]
        );
        connection.release();

        /** Retour de la requête */
        response.status(201).json({ message: 'Restaurateur créé avec succès.', id_user: user.id_user });
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la création du restaurateur.' });
    }
};

export {userGetOne,userCreate, userUpdate}