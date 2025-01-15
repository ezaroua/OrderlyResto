import {pool} from '../../connectionDb'
import {ClientInterface, rowToClientInterface} from "../models/clientModel";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import express from 'express';

/**Recherche d'un client*/
const clientGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer un client*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM client WHERE id_user = ?', [id]);

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

/**Création d'un client */
const clientCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** Récupération des paramètres de la requête */
        const { phone, address, city, postal_code, id_user ,firstname , lastname} = request.body;
console.log(request.body)
        /** Valider l'objet en le convertissant au format ClientInterface */
        const client: ClientInterface = {
            id_client: 0, // Auto-incrémenté par la BDD
            firstname,
            lastname,
            phone,
            address,
            city,
            postal_code,
            id_user,
        };

        /** Vérification des paramètres obligatoires */
        if (!firstname || !lastname || !phone || !address || !city || !postal_code || !id_user) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Insertion en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO client (phone, address, city, postal_code, id_user, firstname , lastname) VALUES (?, ?, ?, ?, ? ,? ,? )',
            [client.phone, client.address, client.city, client.postal_code, client.id_user, client.firstname ,client.lastname]
        );
        connection.release();

        /** Retour de la requête */
        response.status(201).json({ message: 'Client créé avec succès.', id_client: result.insertId });
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la création du client.' });
    }
};

/**Mise à jour d'un client */
const clientUpdate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du client à modifier */
        const id = request.params.id;
        /** Récupération des paramètres de la requête */
        const { phone, address, city, postal_code , firstname , lastname} = request.body;

        /** Vérification des paramètres obligatoires */
        if (!phone || !address || !city || !postal_code) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Valider l'objet en le convertissant au format OrderInterface */
        /** Partiel parce que pas besoin de pouvoir tout modifier : */
        /**
         * user_id : on ne change pas le user : autant changer de client
         */
        const client: Partial<ClientInterface> = {
            phone,
            address,
            city,
            postal_code,
            firstname,
            lastname
        };

        /** Modification en BDD si l'id indiqué existe */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'UPDATE client SET phone = ?, address = ?, city = ?, postal_code = ? , firstname = ? , lastname = ? WHERE id_client = ?',
            [client.phone, client.address, client.city, client.postal_code, client.firstname , client.lastname , id]
        );
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Client non trouvé.' });
        } else {
            response.status(200).json({ message: 'Client mis à jour avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la mise à jour du client.' });
    }
};

/**Mise à jour partielle d'un client */
const clientPatch = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du client à modifier */
        const id = request.params.id;
        /** Récupération des paramètres de la requête */
        /** (1 ou plusieurs champs de client à modifier) */
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
            `UPDATE client SET ${fields} WHERE id_client = ?`,
            values
        );
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Client non trouvé.' });
        } else {
            response.status(200).json({ message: 'Client mis à jour partiellement avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la mise à jour partielle du client.' });
    }
};

/**Suppression d'un client */
const clientDelete = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du client à supprimer */
        const id = request.params.id;

        /** Suppression en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'DELETE FROM client WHERE id_client = ?',
            [id]
        );
        connection.release();

        /** Retour en fonction d'une suppression ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Client non trouvé.' });
        } else {
            response.status(200).json({ message: 'Client supprimé avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la suppression du client.' });
    }
};

export {clientGetOne, clientGetAll, clientCreate, clientUpdate, clientPatch, clientDelete};