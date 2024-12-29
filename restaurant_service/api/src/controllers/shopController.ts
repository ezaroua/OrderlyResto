import {pool} from '../../connectionDb'

import {ShopInterface, rowToShopInterface} from "../models/shopModel";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import express from 'express';

/**
 * GetOne
 */
const shopGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer un client*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM shop WHERE id_shop = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({message: 'Restaurant non trouvé'});
        }else {

            /**Renvoyer une réponse de succès*/
            const shop = rowToShopInterface(rows[0]);

            response.status(200).json(shop);
        }

    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**
 * GetAll
 */
const shopGetAll = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        let shops : ShopInterface[] = [];

        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM shop');

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun restaurant trouvé' });
        }else {

            /**Traitement des donnees de retour de la requete*/
            for (let i = 0; i < rows.length; i++) {
                let shop = rowToShopInterface(rows[i]);
                shops.push(shop);
            }
            /**Renvoyer une réponse de succès*/
            response.status(200).json(shops);
        }
    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        console.log(error);

        response.status(500).json({ message: 'Erreur serveur' });
    }
};

/**
 * Create
 */
const shopCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** Récupération des paramètres de la requête */
        const {
            shop_name,
            address,
            city,
            postal_code,
            phone,
            } = request.body;

        /** Valider l'objet en le convertissant au format ShopInterface */
        const shop: ShopInterface = {
            id_shop: 0, // Auto-incrémenté par la BDD
            shop_name,
            address,
            city,
            postal_code,
            phone,
            rating_count: 0, // 0 a la creation
            shop_rate: 0 // 0 a la creation
        };

        /** Vérification des paramètres obligatoires */
        if (!shop_name || !address || !city || !postal_code || !phone ) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Insertion en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO shop (shop_name, address, city, postal_code, phone) VALUES (?, ?, ?, ?, ?)',
            [shop.shop_name, shop.address, shop.city, shop.postal_code, shop.phone]
        );
        connection.release();

        /** Retour de la requête */
        response.status(201).json({ message: 'Restaurant créé avec succès.', id_shop: result.insertId });
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la création du restaurant.' });
    }
};

/**
 * Update
 */
const shopUpdate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du restaurant à modifier */
        const id = request.params.id;
        /** Récupération des paramètres de la requête */
        const { shop_name, address, city, postal_code, phone } = request.body;

        /** Vérification des paramètres obligatoires */
        if (!shop_name || !address || !city || !postal_code || !phone) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Valider l'objet en le convertissant au format ShopInterface */
        /** Partiel parce que pas besoin de pouvoir tout modifier : */
        /**
         * user_id : on ne change pas le user : autant changer de client
         */
        const shop: Partial<ShopInterface> = {
            shop_name,
            address,
            city,
            postal_code,
            phone
        };

        /** Modification en BDD si l'id indiqué existe */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'UPDATE shop SET shop_name = ?, address = ?, city = ?, postal_code = ?, phone = ? WHERE id_shop = ?',
            [shop.shop_name, shop.address, shop.city, shop.postal_code, shop.phone, id]
        );
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Restaurant non trouvé.' });
        } else {
            response.status(200).json({ message: 'Restaurant mis à jour avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant.' });
    }
};

/**
 * Patch
 */
const shopPatch = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du restaurant à modifier */
        const id = request.params.id;
        /** Récupération des paramètres de la requête */
        /** (1 ou plusieurs champs de restaurant à modifier) */
        const updates = request.body;

        /** Vérifier si des données sont fournies */
        if (Object.keys(updates).length === 0) {
            response.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
            return;
        }

        const connection = await pool.getConnection();

        /** Générer dynamiquement la requête SQL et les valeurs */
        const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updates);
        values.push(id);

        /** Modification en BDD si l'id indiqué existe */
        const [result] = await connection.execute<ResultSetHeader>(
            `UPDATE shop SET ${fields} WHERE id_shop = ?`,
            values
        );
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Restaurant non trouvé.' });
        } else {
            response.status(200).json({ message: 'Restaurant mis à jour partiellement avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la mise à jour partielle du restaurant.' });
    }
};

/**
 * Delete
 */
const shopDelete = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du restaurant à supprimer */
        const id = request.params.id;

        /** Suppression en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'DELETE FROM shop WHERE id_shop = ?',
            [id]
        );
        connection.release();

        /** Retour en fonction d'une suppression ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Restaurant non trouvé.' });
        } else {
            response.status(200).json({ message: 'Restaurant supprimé avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la suppression du restaurant.' });
    }
};

/**
 *  Rate
 */
const shopRate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** Extraction et validation des données */
        const { rating } = request.body;
        const id = Number(request.params.id);

        const validRating = [0, 1, 2, 3, 4, 5];

        if (
            typeof rating !== 'number' ||
            !validRating.includes(rating) ||
            !Number.isInteger(id)
        ) {
            response.status(400).json({ message: 'La note doit être comprise entre 0 et 5.' });
            return;
        }

        /** Connexion à la base de données */
        const connection = await pool.getConnection();

        /** Vérification de l'existence du shop */
        const [rows] = await connection.execute<RowDataPacket[]>(
            'SELECT * FROM shop WHERE id_shop = ?',
            [id]
        );

        if (rows.length === 0) {
            connection.release();
            response.status(404).json({ message: 'Restaurant non trouvé.' });
            return;
        }

        const currentShop = rows[0];
        /** si valeur à null en base: 0*/
        const currentRating = currentShop['shop_rate'] ?? 0;
        const currentCount = currentShop['rating_count'] ?? 0;

        /** Calcul du nouveau rating */
        const newCount = currentCount + 1;
        const newRating = ((currentRating * currentCount) + rating) / newCount;

        /** Mise à jour du rating */
        await connection.execute(
            'UPDATE shop SET rating_count = ?, shop_rate = ? WHERE id_shop = ?',
            [newCount, newRating, id]
        );

        /** Récupération des nouvelles données */
        const [updatedRows] = await connection.execute<RowDataPacket[]>(
            'SELECT * FROM shop WHERE id_shop = ?',
            [id]
        );

        connection.release();

        response.status(200).json({
            message: 'Évaluation mise à jour avec succès.',
            shop: updatedRows[0]
        });

    } catch (error) {
        console.error('Erreur serveur:', error);
        response.status(500).json({ message: 'Erreur serveur.' });
    }
};

export {shopGetOne, shopGetAll, shopCreate, shopUpdate, shopPatch, shopDelete, shopRate};