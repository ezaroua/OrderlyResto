import express from 'express';
import axios from "axios";


const getDelivery = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const id = request.params.id

        const result = await axios({
            method: 'get',
            url: `http://localhost:5005/delivery/${id}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        /**Renvoyer une réponse de succès*/
        response.status(200).json(result.data);
    } catch
        (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur', error});
    }
};

export{getDelivery};