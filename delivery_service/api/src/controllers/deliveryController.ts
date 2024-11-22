import {pool} from '../../connectionDb'
import {DeliveryInterface, rowToDeliveryInterface} from "../models/deliveryModel";
import {RowDataPacket} from "mysql2/promise";
import express from 'express';

/**Recherche d'un utilisateur*/
const deliveryGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer un dossier admin*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM t_delivery WHERE id_user = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();
        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({message: 'Utilisateur non trouvé'});
        }else {

            /**Renvoyer une réponse de succès*/
            const delivery = rowToDeliveryInterface(rows[0]);

            response.status(200).json(delivery);
        }

    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Liste de toutes les mutuelles*/
const deliveryGetAll = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        let deliveries : DeliveryInterface[] = [];

        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM t_delivery');
        
        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();
        
        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }else {
            
            /**Traitement des donnees de retour de la requete*/
            for (let i = 0; i < rows.length; i++) {
                let delivery = rowToDeliveryInterface(rows[i]);
                deliveries.push(delivery);
            }
            /**Renvoyer une réponse de succès*/
            response.status(200).json(deliveries);
        }
    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export{deliveryGetOne, deliveryGetAll};