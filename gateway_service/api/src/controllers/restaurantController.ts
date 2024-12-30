import express from 'express';
import axios from "axios";
import {rowToShopInterface} from "../models/shopModel";

/**Liste de toutes les restaurants*/
const getAllRestaurant = async (request: express.Request, response: express.Response): Promise<void> => {
    try {

        const result = await axios({
            method: 'get',
            url: `http://localhost:5004/shop`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        /**Renvoyer une réponse de succès*/
        response.status(200).json(result.data);

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

const getRestaurant = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const id = request.params.id

        const restaurantGet = await axios({
            method: 'get',
            url: `http://localhost:5004/shop/${id}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });
        let restaurant = rowToShopInterface(restaurantGet.data)

        const itemsGet = await axios({
            method: 'get',
            url: `http://localhost:5004/product/shop/${id}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });
        restaurant.items = itemsGet.data

        /**Renvoyer une réponse de succès*/
        response.status(200).json(restaurant);
    } catch
        (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

export {getAllRestaurant, getRestaurant};