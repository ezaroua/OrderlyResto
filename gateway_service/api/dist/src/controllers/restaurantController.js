"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGetAll = exports.userGetOne = void 0;
const connectionDb_1 = require("../../connectionDb");
const utilisateurModel_1 = require("../models/utilisateurModel");
/**Recherche d'un utilisateur*/
const userGetOne = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = yield connectionDb_1.pool.getConnection();
        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;
        /**Execute une requete sur la base de données SQL pour recuperer un dossier admin*/
        const [rows] = yield connection.execute('SELECT * FROM user WHERE id_user = ?', [id]);
        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();
        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        else {
            /**Renvoyer une réponse de succès*/
            const user = (0, utilisateurModel_1.rowToUserInterface)(rows[0]);
            response.status(200).json(user);
        }
    }
    catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.userGetOne = userGetOne;
/**Liste de toutes les mutuelles*/
const userGetAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = [];
        /** Obtenir une connexion à partir du pool*/
        const connection = yield connectionDb_1.pool.getConnection();
        /** Exécuter une requête SQL*/
        const [rows] = yield connection.execute('SELECT * FROM user');
        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();
        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }
        else {
            /**Traitement des donnees de retour de la requete*/
            for (let i = 0; i < rows.length; i++) {
                let user = (0, utilisateurModel_1.rowToUserInterface)(rows[i]);
                users.push(user);
            }
            /**Renvoyer une réponse de succès*/
            response.status(200).json(users);
        }
    }
    catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.userGetAll = userGetAll;
//# sourceMappingURL=restaurantController.js.map