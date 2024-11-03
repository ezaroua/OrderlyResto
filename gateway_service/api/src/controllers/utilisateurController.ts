import {pool} from '../../connectionDb'
import {UserInterface, rowToUserInterface} from "../models/utilisateurModel";
import {RowDataPacket} from "mysql2/promise";
import express from 'express';
import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config()

/**Recherche d'un utilisateur*/
const userGetOne = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        await axios({
            method: 'get',
            url: `http://localhost:5002/users/ ${request.params.id}`,
            headers: {'Authorization': `${process.env.API_KEY}`},
        })
            .then(success => {
                response.status(200).json(success.data)
            })
            .catch(error => response.status(404).json('Aucun utilisateur !'));
        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;
    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Liste de toutes les mutuelles*/
const userGetAll = async (request: express.Request, response: express.Response): Promise<void> => {
    try {
        /**Creer une connexion avec la base de données SQL*/
        await axios({
            method: 'get',
            url: `http://localhost:5002/users`,
            headers: {'Authorization': `${process.env.API_KEY}`},
        })
            .then(success => {
                response.status(200).json(success.data)
            })
            .catch(error => response.status(404).json('Aucun utilisateur !'));
        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;
    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

export {userGetOne, userGetAll};