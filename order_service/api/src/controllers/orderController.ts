import {pool} from '../../connectionDb'
import {OrderInterface, rowToOrderInterface} from "../models/orderModel";
import {RowDataPacket} from "mysql2/promise";
import express from 'express';

/**Recherche d'une commande*/
const orderGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer une commande*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM `order` WHERE order_id = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({message: 'Commande non trouvée'});
        }else {
            /**Renvoyer une réponse de succès*/
            const formatted_order = {...rows[0], items: JSON.parse(rows[0]?.items)};
            const order = rowToOrderInterface(formatted_order);
            
            response.status(200).json(order);
        }

    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Liste de tous les commandes*/
const orderGetAll = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        let orders : OrderInterface[] = [];

        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM `order`');

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucune commande trouvée' });
        }else {
            /**Traitement des donnees de retour de la requete*/
            for (let i = 0; i < rows.length; i++) {
                const formatted_order = {...rows[i], items: JSON.parse(rows[i]?.items)};
                let order = rowToOrderInterface(formatted_order);
                orders.push(order);
            }
            /**Renvoyer une réponse de succès*/
            response.status(200).json(orders);
        }
    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export {orderGetOne, orderGetAll};