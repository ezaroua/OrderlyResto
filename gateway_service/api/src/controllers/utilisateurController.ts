import {pool} from '../../connectionDb'
import {UserInterface, rowToUserInterface} from "../models/utilisateurModel";
import {RowDataPacket} from "mysql2/promise";
import express from 'express';
import dotenv from 'dotenv'
import axios, {AxiosError, AxiosResponse} from 'axios';
import {sign} from "jsonwebtoken";

dotenv.config()

const userCreate = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const email = request.body.email;
        const password = request.body.password;
        const roleId = request.body.role_id;

        const result = await axios({
            method: 'post',
            url: `http://localhost:5002/users`,
            headers: {'api-key': `${process.env.API_KEY}`},
            data: {
                email: email,
                password: password,
                role_id: roleId
            }
        });

        switch (request.body.role_id) {
            case 1:
                break
            case 2:
                break
            case 3:
                break
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

const userDelete = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        const userId = request.params.id

        const result = await axios({
            method: 'delete',
            url: `http://localhost:5002/users/${userId}`,
            headers: {'api-key': `${process.env.API_KEY}`}
        });

        switch (request.body.role_id) {
            case 1:
                break
            case 2:
                break
            case 3:
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

            let userInfo;
            const roleId = result.data.user.role_id;
            const userId = result.data.user.user_id;

            switch (roleId) {
                case 1 :

                    userInfo = await axios({
                        method: 'get',
                        url: `http://localhost:5004/users/connexion`,
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
                        url: `http://localhost:5005/users/connexion`,
                        headers: {'api-key': `${process.env.API_KEY}`}
                    });
                    break
            }

            if (userInfo != null) {
                /**Si les mots de passes correspondent alors on genere un token pour une session de 1 heure*/
                const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
                const payload = {
                    user_email: email,
                    role_id: result.data.user.role_id,
                    user_id: result.data.user.user_id,
                    exp: expiration
                };
                const token = sign(payload, process.env.SECRET_KEY as string);
                response.status(201).json({token: token, userInfo: userInfo.data});
            } else {
                response.status(404).json({message: 'Profil demandé introuvable'})
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

export {userConnexion, userCreate,userDelete};