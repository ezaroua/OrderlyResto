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
exports.deliveryGetAll = exports.deliveryGetOne = void 0;
const connectionDb_1 = require("../../connectionDb");
const deliveryModel_1 = require("../models/deliveryModel");
/**Recherche d'un utilisateur*/
const deliveryGetOne = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = yield connectionDb_1.pool.getConnection();
        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;
        /**Execute une requete sur la base de données SQL pour recuperer un dossier admin*/
        const [rows] = yield connection.execute('SELECT * FROM t_delivery WHERE id_user = ?', [id]);
        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();
        if (rows.length === 0) {
            /** Renvoyer une reponse not found*/
            response.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        else {
            /**Renvoyer une réponse de succès*/
            const delivery = (0, deliveryModel_1.rowToDeliveryInterface)(rows[0]);
            response.status(200).json(delivery);
        }
    }
    catch (error) {
        /**Renvoyer une réponse d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.deliveryGetOne = deliveryGetOne;
/**Liste de toutes les mutuelles*/
const deliveryGetAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deliveries = [];
        /** Obtenir une connexion à partir du pool*/
        const connection = yield connectionDb_1.pool.getConnection();
        /** Exécuter une requête SQL*/
        const [rows] = yield connection.execute('SELECT * FROM t_delivery');
        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();
        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            response.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }
        else {
            /**Traitement des donnees de retour de la requete*/
            for (let i = 0; i < rows.length; i++) {
                let delivery = (0, deliveryModel_1.rowToDeliveryInterface)(rows[i]);
                deliveries.push(delivery);
            }
            /**Renvoyer une réponse de succès*/
            response.status(200).json(deliveries);
        }
    }
    catch (error) {
        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.deliveryGetAll = deliveryGetAll;
//# sourceMappingURL=deliveryController.js.map