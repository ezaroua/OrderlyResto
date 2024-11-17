import {pool} from '../../connectionDb'
import {ClientInterface, rowToClientInterface} from "../models/clientModel";
import {RowDataPacket} from "mysql2/promise";
import express from 'express';

/**Recherche d'un client*/
const clientGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer un client*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM client WHERE client_id = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({message: 'Client non trouvé'});
        }else {

            /**Renvoyer une réponse de succès*/
            const client = rowToClientInterface(rows[0]);

            response.status(200).json(client);
        }

    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Liste de tous les clients*/
const clientGetAll = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        let clients : ClientInterface[] = [];

        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM client');

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun client trouvé' });
        }else {

            /**Traitement des donnees de retour de la requete*/
            for (let i = 0; i < rows.length; i++) {
                let client = rowToClientInterface(rows[i]);
                clients.push(client);
            }
            /**Renvoyer une réponse de succès*/
            response.status(200).json(clients);
        }
    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        console.log(error);
        
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export {clientGetOne, clientGetAll};