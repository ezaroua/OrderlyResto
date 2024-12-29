"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowToDeliveryInterface = rowToDeliveryInterface;
/**
 * Mapper compte utilisateur
 */
function rowToDeliveryInterface(row) {
    return {
        id_delivery_user: row['id_delivery_user'],
        id_user: row['id_user'],
        first_name: row['first_name'],
        last_name: row['last_name'],
        vehicle: row['vehicle'],
        rating_count: row['rating_count'],
        rating: Math.round(row['rating'] * 100) / 100
    };
}
//# sourceMappingURL=deliveryModel.js.map