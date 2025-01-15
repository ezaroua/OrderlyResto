import {pool} from '../../connectionDb'
import {OrderInterface, rowToOrderInterface} from "../models/orderModel";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import express from 'express';

/**Recherche d'une commande*/
const orderGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer une commande*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM `order` WHERE id_order = ?', [id]);

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

/**Création d'une commande */
const orderCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** Récupération des paramètres de la requête */
        const { id_shop, id_client, id_delivery_user, total_amount, items, client_note } = request.body;

        /** Valider l'objet en le convertissant au format OrderInterface */
        const order: OrderInterface = {
            id_order: 0, // Auto-incrémenté par la BDD
            id_shop,
            id_client,
            id_delivery_user,
            status: 'draft', // une commande crée est en draft par défaut
            total_amount,
            items, // JSON.stringify sera appliqué avant l'insertion
            order_date: new Date(), // la date de création de la commande est auto
            client_note,
        };

        /** Vérification des paramètres obligatoires */
        if (!id_shop || !id_client || !total_amount || !items) {
            response.status(400).json({message: "Tous les champs requis ne sont pas fournis."});
            return ;
        }
        if (!id_shop || !id_client || !total_amount || !items) {
            response.status(400).json({ message: "Tous les champs requis ne sont pas fournis." });
            return;
        }

        /** Insertion en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>('INSERT INTO `order` (id_shop, id_client, id_delivery_user, status, total_amount, items, order_date, client_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            order.id_shop, order.id_client, order.id_delivery_user, order.status, order.total_amount, JSON.stringify(order.items), order.order_date, order.client_note
        ]);
        connection.release();

        /** Retour de la requête */
        response.status(201).json({ message: "Commande créée avec succès.", id_order: result.insertId });
    } catch (error) {
        response.status(500).json({message: "Erreur serveur"});
    }
};


/**Mise à jour d'une commande */
const orderUpdate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID de la commande à modifier */
        const {id} = request.params;
        /** Récupération des paramètres de la requête */
        const { id_delivery_user, status, total_amount, items, client_note } = request.body;

        /** Vérification des paramètres obligatoires */
        if (!id_delivery_user || !status || !total_amount || !items || !client_note) {
            response.status(400).json({ message: "Tous les champs requis ne sont pas fournis." });
            return;
        }

        /** Valider l'objet en le convertissant au format OrderInterface */
        /** Partiel parce que pas besoin de pouvoir tout modifier : */
        /**
         * id_shop : on ne change pas le resto : autant changer de commande (supprimer et recréer)
         * id_client : on ne change pas le client : autant changer de commande (supprimer et recréer)
         * order_date : on garde la date initiale création
         */
        const order: Partial<OrderInterface> = {
            id_delivery_user,
            status,
            total_amount,
            items, // JSON.stringify sera appliqué avant la requête
            client_note,
        };

        /** Modification en BDD si l'id indiqué existe */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>('UPDATE `order` SET id_delivery_user = ?, status = ?, total_amount = ?, items = ?, client_note = ? WHERE id_order = ?', [
            order.id_delivery_user, order.status, order.total_amount, JSON.stringify(order.items), order.client_note, id
        ]);
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: "Commande non trouvée." });
        } else {
            response.status(200).json({ message: "Commande mise à jour avec succès." });
        }
    } catch (error) {
        response.status(500).json({ message: "Erreur serveur" });
    }
};

/**Mise à jour partielle d'une commande */
const orderPatch = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID de la commande à modifier */
        const id = request.params.id;
        /** Récupération des paramètres de la requête */
        /** (1 ou plusieurs champs de order à modifier) */
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
            `UPDATE \`order\` SET ${fields} WHERE id_order = ?`,
            values
        );
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Commande non trouvée.' });
        } else {
            response.status(200).json({ message: 'Commande mise à jour partiellement avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la mise à jour partielle de la commande.' });
    }
};

/**Suppression d'une commande */
const orderDelete = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID de la commande à supprimer */
        const { id } = request.params;

        /** Suppression en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM `order` WHERE id_order = ?', [id]);
        connection.release();

        /** Retour en fonction d'une suppression ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: "Commande non trouvée." });
        } else {
            response.status(200).json({ message: "Commande supprimée avec succès." });
        }
    } catch (error) {
        response.status(500).json({ message: "Erreur serveur" });
    }
};

export {orderGetOne, orderGetAll, orderCreate, orderUpdate, orderPatch, orderDelete};