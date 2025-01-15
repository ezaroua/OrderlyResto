import express from 'express';
import axios, {AxiosResponse, getAdapter} from "axios";

/**Liste de toutes les commandes*/
const getAllOrder = async (request: express.Request, response: express.Response): Promise<void> => {
    try {

        const id = request.params.id;
        const roleId = request.params.roleId;

        switch (roleId) {
            case "1":
                 const resultRestaurant = await axios({
                    method: 'get',
                    url: `http://localhost:5003/orders/all/${id}/${roleId}`,
                    headers: {'api-key': `${process.env.API_KEY}`}
                });
                response.status(200).json(resultRestaurant.data);
                break;
            case "2":
                 const resultClient = await axios({
                    method: 'get',
                    url: `http://localhost:5003/orders/all/${id}/${roleId}`,
                    headers: {'api-key': `${process.env.API_KEY}`}
                });
                response.status(200).json(resultClient.data);
                break;
            case "3":
                 const resultDelivery = await axios({
                    method: 'get',
                    url: `http://localhost:5003/orders/all/${id}/${roleId}`,
                    headers: {'api-key': `${process.env.API_KEY}`}
                });
                response.status(200).json(resultDelivery.data);
                break;
        }

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

        const result = await axios({
            method: 'post',
            url: `http://localhost:5003/orders`,
            headers: {'api-key': `${process.env.API_KEY}`},
            data: {
                client_id: request.body.client_id,
                shop_id: request.body.shop_id,
                delivery_id: request.body.delivery_id,
                total_amount: request.body.total_amount,
                client_note: request.body.client_note,
                items: request.body.items
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

        const result = await axios({
            method: 'put',
            url: `http://localhost:5003/orders/${id}`,
            headers: {'api-key': `${process.env.API_KEY}`},
            data: {
                id_client: request.body.id_client,
                id_shop: request.body.id_shop,
                status: request.body.status,
                id_delivery_user: request.body.id_delivery_user,
                total_amount: request.body.total_amount,
                client_note: request.body.client_note,
                items: request.body.items
            }
        });

        /**Renvoyer une réponse de succès*/
        response.status(200).json(result.data.order_id);

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

const ratingOrder = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const shopId = request.body.shop_id
        const deliveryId = request.body.delivery_id
        const ratingDelivery = request.body.rating_delivery
        const ratingShop = request.body.rating_shop


        if (ratingDelivery != null) {
            const resultDelivery = await axios({
                method: 'put',
                url: `http://localhost:5005/rating/${deliveryId}`,
                headers: {'api-key': `${process.env.API_KEY}`},
                data: {
                    delivery_id:deliveryId,
                    rating: ratingDelivery
                }
            });
        }

        if (ratingShop != null) {
            const resultRestaurant = await axios({
                method: 'put',
                url: `http://localhost:5004/shop/rate/${shopId}`,
                headers: {'api-key': `${process.env.API_KEY}`},
                data: {
                    shop_id:shopId,
                    rating: ratingShop
                }
            });
        }

        /**Renvoyer une réponse de succès*/
        response.status(200).json({message:"Avis prise en compte !"});

    } catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

export {getOrder, getAllOrder, createOrder, updateOrder,ratingOrder};