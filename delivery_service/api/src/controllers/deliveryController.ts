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

/**modification de la note d'un livreur*/
const rateDelivery = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        //Extraction des données reçues
        const data = request.body;

        const validRating = [0, 1, 2, 3, 4, 5];
        
        //Validation simple de la data
        if(!(!data || typeof data !== 'object' || !validRating.includes(data['rating']) || !Number.isInteger(data['rating']) || !Number.isInteger(data['id_user'])) ){
            
            
            
            /**Creer une connexion avec la base de données SQL*/
            const connection = await pool.getConnection();
            
            /**Recuperation des données dans les parametres de la requete*/
            const id = request.params.id;
            
            /**Execute une requete sur la base de données SQL pour recuperer un utilisateur livreur*/
            const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM t_delivery WHERE id_user = ?', [id]);
            
            const user_id = rows[0]['ID_USER']
            const rating = rows[0]['RATING']
            const d_count = rows[0]['DELIVERY_COUNT']
            const new_d_count = d_count + 1
            const new_rating = ((rating * d_count) + data['rating']) / new_d_count
            
            await connection.execute<RowDataPacket[]>('UPDATE t_delivery SET RATING = ?, DELIVERY_COUNT = ? WHERE id_user = ?', [new_rating,new_d_count,user_id]);
            
            /**Execute une requete sur la base de données SQL pour recuperer un utilisateur livreur*/
            const [test] = await connection.execute<RowDataPacket[]>('SELECT * FROM t_delivery WHERE id_user = ?', [id]);
            console.log(test)
            
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
    } else
    {
        response.status(400).json({ message: 'Invalid data'});
    }
    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

export{deliveryGetOne, deliveryGetAll, rateDelivery};