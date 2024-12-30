import {pool} from '../../connectionDb'
import {UserInterface, rowToUserInterface} from "../models/utilisateurModel";
import {RowDataPacket} from "mysql2/promise";
import express from 'express';
import axios from "axios";
import {verify} from "jsonwebtoken";

/**Liste de toutes les restaurants*/
const getAllOrder = async (request: express.Request, response: express.Response): Promise<void> => {
    try {

        const id = request.query.id;
        const roleId = request.query.roleId;

        const result = await axios({
            method: 'get',
            url: `http://localhost:5003/orders/?id=${id}&roleId=${roleId}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        /**Renvoyer une réponse de succès*/
        response.status(200).json(result.data);

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

const getOrder = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const id = request.params.id
        const result = await axios({
            method: 'get',
            url: `http://localhost:5003/orders/${id}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        /**Renvoyer une réponse de succès*/
        response.status(200).json(result.data);

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

const createOrder = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const id = request.params.id

        const result = await axios({
            method: 'post',
            url: `http://localhost:5003/orders`,
            headers: {'api-key': `${process.env.API_KEY}`},
            data : {
                client_id:request.body.client_id,
                shop_id:request.body.shop_id,
                delivery_id:request.body.delivery_id,
                total_amount:request.body.total_amount,
                client_note:request.body.client_note,
                items:request.body.items
            }
        });

        /**Renvoyer une réponse de succès*/
        response.status(200).json(result.data.order_id);

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

const updateOrder = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const id = request.params.id
console.log(1)
        const result = await axios({
            method: 'put',
            url: `http://localhost:5003/orders/${id}`,
            headers: {'api-key': `${process.env.API_KEY}`},
            data : {
                client_id:request.body.client_id,
                shop_id:request.body.shop_id,
                status:request.body.status,
                delivery_id:request.body.delivery_id,
                total_amount:request.body.total_amount,
                client_note:request.body.client_note,
                items:request.body.items
            }
        });
        console.log(2)
        /**Renvoyer une réponse de succès*/
        response.status(200).json(result.data.order_id);

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

export{getOrder,getAllOrder,createOrder,updateOrder};