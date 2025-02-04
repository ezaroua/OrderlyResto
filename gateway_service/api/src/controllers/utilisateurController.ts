import express from 'express';
import dotenv from 'dotenv'
import axios from 'axios';
import {sign} from "jsonwebtoken";

dotenv.config()

const userCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const result = await axios({
            method: 'post',
            url: `http://localhost:5002/users`,
            headers: {'api-key': `${process.env.API_KEY}`},
            data: {
                email: request.body.email,
                password: request.body.password,
                role_id: request.body.role_id
            }
        });

        switch (request.body.role_id) {
            case 1:

                await axios({
                    method: 'post',
                    url: `http://localhost:5004/user`,
                    headers: {'api-key': `${process.env.API_KEY}`},
                    data: {
                        id_user: result.data.user_id,
                        id_shop: request.body.shop_id,
                        firstname: request.body.firstname,
                        lastname: request.body.lastname
                    }
                });
                break;

            case 2:
                await axios({
                    method: 'post',
                    url: `http://localhost:5003/clients/`,
                    headers: {'api-key': `${process.env.API_KEY}`},
                    data: {
                        id_user: result.data.user_id,
                        phone: request.body.phone,
                        address: request.body.address,
                        city: request.body.city,
                        postal_code: request.body.postal_code,
                        firstname: request.body.firstname,
                        lastname: request.body.lastname
                    }
                });
                break;

            case 3:
                await axios({
                    method: 'post',
                    url: `http://localhost:5005/register/`,
                    headers: {'api-key': `${process.env.API_KEY}`},
                    data: {
                        user_id: result.data.user_id,
                        first_name: request.body.first_name,
                        last_name: request.body.last_name,
                        vehicle: request.body.vehicle
                    }
                });
                break;

        }

        response.status(201).json({body: 'Compte creer avec succes', user_id: result.data.user_id})

    } catch
        (err) {
        if (axios.isAxiosError(err)) {
            /**Renvoyer une réponse d'echec*/
            response.status(err.status!).json(err.message)
        } else {
            /**Renvoyer une réponse d'echec*/
            response.status(500).json({body: 'Erreur serveur'});
        }
    }
}

const userUpdate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const id = request.params.id
        const result = await axios({
            method: 'put',
            url: `http://localhost:5002/users/${id}`,
            headers: {'api-key': `${process.env.API_KEY}`},
            data: {
                email: request.body.email,
                password: request.body.password,
                role_id: request.body.role_id
            }
        });

        switch (request.body.role_id) {
            case 1:
                await axios({
                    method: 'put',
                    url: `http://localhost:5004/user/${id}`,
                    headers: {'api-key': `${process.env.API_KEY}`},
                    data: {
                        firstname: request.body.firstname,
                        lastname: request.body.lastname,
                        id_shop:request.body.id_shop,
                    }
                });
                break;

            case 2:
                await axios({
                    method: 'put',
                    url: `http://localhost:5003/clients/${id}`,
                    headers: {'api-key': `${process.env.API_KEY}`},
                    data: {
                        phone: request.body.phone,
                        address: request.body.address,
                        city: request.body.city,
                        postal_code: request.body.postal_code,
                        firstname: request.body.firstname,
                        lastname: request.body.lastname
                    }
                });
                break;

            case 3:
                await axios({
                    method: 'put',
                    url: `http://localhost:5005/update/${id}`,
                    headers: {'api-key': `${process.env.API_KEY}`},
                    data: {
                        first_name: request.body.first_name,
                        last_name: request.body.last_name,
                        vehicle: request.body.vehicle
                    }
                });
                break;
        }
        response.status(201).json({body: 'Compte mise a jour avec succes', user_id: result.data.user_id})
    } catch
        (err) {
        if (axios.isAxiosError(err)) {
            /**Renvoyer une réponse d'echec*/
            response.status(err.status!).json(err.message)
        } else {
            /**Renvoyer une réponse d'echec*/
            response.status(500).json({body: 'Erreur serveur'});
        }
    }
}

const userDelete = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const userId = request.params.id

        const resultGet = await axios({
            method: 'get',
            url: `http://localhost:5002/users/${userId}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        const result = await axios({
            method: 'delete',
            url: `http://localhost:5002/users/${userId}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        switch (resultGet.data.role_id) {
            case 1:
                break

            case 2:
                await axios({
                    method: 'delete',
                    url: `http://localhost:5003/clients/${userId}`,
                    headers: {'api-key': `${process.env.API_KEY}`}
                });
                break

            case 3:
                await axios({
                    method: 'delete',
                    url: `http://localhost:5005/delivery/${userId}`,
                    headers: {'api-key': `${process.env.API_KEY}`}
                });
                break

        }

        response.status(200).json("Utilisateur supprimé !")

    } catch (err) {
        if (axios.isAxiosError(err)) {
            /**Renvoyer une réponse d'echec*/
            response.status(err.status!).json(err.message)
        } else {
            /**Renvoyer une réponse d'echec*/
            response.status(500).json({body: 'Erreur serveur'});
        }
    }
}

const userConnexion = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        if (email && password) {
            const result = await axios({
                method: 'post',
                url: `http://localhost:5002/users/connexion`,
                headers: {'api-key': `${process.env.API_KEY}`},
                data: {
                    email: request.body.email,
                    password: request.body.password
                }
            });


            const roleId = result.data.user.role_id;
            const userId = result.data.user.user_id;

            let userInfo;

            switch (roleId) {
                case 1:
                    userInfo = await axios({
                        method: 'get',
                        url: `http://localhost:5004/user/${userId}`,
                        headers: {'api-key': `${process.env.API_KEY}`}
                    });
                    break
                case 2:
                    userInfo = await axios({
                        method: 'get',
                        url: `http://localhost:5003/clients/${userId}`,
                        headers: {'api-key': `${process.env.API_KEY}`}
                    });
                    break
                case 3:
                    userInfo = await axios({
                        method: 'get',
                        url: `http://localhost:5005/delivery/${userId}`,
                        headers: {'api-key': `${process.env.API_KEY}`}
                    });
                    break
            }

            /**Si les mots de passes correspondent alors on genere un token pour une session de 1 heure*/
            const expiration = Math.floor(Date.now() / 1000) + (60 * 3600);
            const payload = {
                user_email: email,
                role_id: result.data.user.role_id,
                user_id: result.data.user.user_id,
                exp: expiration
            };

            const token = sign(payload, process.env.SECRET_KEY as string);
            if (userInfo != null) {
                response.status(201).json({token: token, userInfo: userInfo.data});
            } else {
                response.status(201).json({token: token});
            }
        } else {
            response.status(403).json({message: 'Email ou mots de passe manquant'})
        }
    } catch
        (err) {
        if (axios.isAxiosError(err)) {
            /**Renvoyer une réponse d'echec*/
            response.status(err.status!).json(err.message)
        } else {
            /**Renvoyer une réponse d'echec*/
            response.status(500).json({message: 'Erreur serveur'});
        }
    }
}

export {userConnexion, userCreate, userDelete, userUpdate};