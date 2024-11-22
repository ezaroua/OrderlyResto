"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowToDeliveryInterface = rowToDeliveryInterface;
/**
 * Mapper compte utilisateur
 */
function rowToDeliveryInterface(row) {
    return {
        id_user: row['ID_USER'],
        name: row['NAME'],
        vehicle: row['VEHICLE'],
        delivery_count: row['DELIVERY_COUNT'],
        rating: Math.round(row['RATING'] * 100) / 100
    };
}
//# sourceMappingURL=deliveryModel.js.map