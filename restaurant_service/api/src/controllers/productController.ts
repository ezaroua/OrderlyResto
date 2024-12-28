import {pool} from '../../connectionDb'

import {ProductInterface, rowToProductInterface} from "../models/productModel";
import {ResultSetHeader, RowDataPacket} from "mysql2/promise";
import express from 'express';

/**
 * GetOne
 */
const productGetOne = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL pour recuperer un client*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM product WHERE id_product = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({message: 'Produit non trouvé'});
        }else {

            /**Renvoyer une réponse de succès*/
            const shop = rowToProductInterface(rows[0]);

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
const productGetAll = async (request: express.Request, response: express.Response):Promise<void> => {
    try {
        let products : ProductInterface[] = [];

        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM product');

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun produit trouvé' });
        }else {

            /**Traitement des donnees de retour de la requete*/
            for (let i = 0; i < rows.length; i++) {
                let product = rowToProductInterface(rows[i]);
                products.push(product);
            }
            /**Renvoyer une réponse de succès*/
            response.status(200).json(products);
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
const productCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** Récupération des paramètres de la requête */
        const {
            product_name,
            description,
            id_shop,
            stock_quantity,
            price
        } = request.body;

        /** Valider l'objet en le convertissant au format ProductInterface */
        const product: ProductInterface = {
            id_product: 0, // Auto-incrémenté par la BDD
            product_name,
            description,
            id_shop,
            stock_quantity,
            price
        };

        /** Vérification des paramètres obligatoires */
        if (!product_name || !description || !id_shop || !stock_quantity || !price ) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Insertion en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO product (product_name, description, id_shop, stock_quantity, price) VALUES (?, ?, ?, ?, ?)',
            [product.product_name, product.description, product.id_shop, product.stock_quantity, product.price]
        );
        connection.release();

        /** Retour de la requête */
        response.status(201).json({ message: 'Produit créé avec succès.', id_shop: result.insertId });
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la création du produit.' });
    }
};

/**
 * Update
 */
const productUpdate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du produit à modifier */
        const id = request.params.id;
        /** Récupération des paramètres de la requête */
        const { product_name, description, id_shop, stock_quantity, price } = request.body;

        /** Vérification des paramètres obligatoires */
        if (!product_name || !description || !id_shop || !stock_quantity || !price) {
            response.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
            return;
        }

        /** Valider l'objet en le convertissant au format ShopInterface */
        /** Partiel parce que pas besoin de pouvoir tout modifier : */
        /**
         * user_id : on ne change pas le user : autant changer de client
         */
        const product: Partial<ProductInterface> = {
            product_name,
            description,
            id_shop,
            stock_quantity,
            price
        };

        /** Modification en BDD si l'id indiqué existe */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'UPDATE product SET product_name = ?, description = ?, id_shop = ?, stock_quantity = ?, price = ? WHERE id_product = ?',
            [product.product_name, product.description, product.id_shop, product.stock_quantity, product.price, id]
        );
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Produit non trouvé.' });
        } else {
            response.status(200).json({ message: 'Produit mis à jour avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la mise à jour du produit.' });
    }
};

/**
 * Patch
 */
const productPatch = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du produit à modifier */
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
            `UPDATE product SET ${fields} WHERE id_product = ?`,
            values
        );
        connection.release();

        /** Retour en fonction d'une modif ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Produit non trouvé.' });
        } else {
            response.status(200).json({ message: 'Produit mis à jour partiellement avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la mise à jour partielle du produit.' });
    }
};

/**
 * Delete
 */
const productDelete = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /** ID du produit à supprimer */
        const id = request.params.id;

        /** Suppression en BDD */
        const connection = await pool.getConnection();
        const [result] = await connection.execute<ResultSetHeader>(
            'DELETE FROM product WHERE id_product = ?',
            [id]
        );
        connection.release();

        /** Retour en fonction d'une suppression ou non */
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'Produit non trouvé.' });
        } else {
            response.status(200).json({ message: 'Produit supprimé avec succès.' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erreur lors de la suppression du produit.' });
    }
};

export {productGetOne, productGetAll, productCreate, productUpdate, productPatch, productDelete};