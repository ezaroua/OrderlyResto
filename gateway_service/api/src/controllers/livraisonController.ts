import {pool} from '../../connectionDb'
import {UserInterface, rowToUserInterface} from "../models/utilisateurModel";
import {RowDataPacket} from "mysql2/promise";
import express from 'express';
import axios from "axios";

/**Liste de toutes les restaurants*/
const getAllOrder = async (request: express.Request, response: express.Response): Promise<void> => {
    try {

        const result = await axios({
            method: 'get',
            url: `http://localhost:5003/orders`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        /**Renvoyer une réponse de succès*/
        response.status(200).json({body: result.data});

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
        response.status(200).json({body: result.data});

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};


export{getOrder,getAllOrder};