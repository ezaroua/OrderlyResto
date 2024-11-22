import {RowDataPacket} from "mysql2/promise";

/**
 * Interface compte utilisateur
 */
interface DeliveryInterface {
    id_user: number;
    name: string;
    vehicle: string;
    delivery_count: number;
    rating: number;
    // TODO reste de l'interface
}

/**
 * Mapper compte utilisateur
 */
function rowToDeliveryInterface (row: RowDataPacket): DeliveryInterface {
    return {
        id_user: row['ID_USER'],
        name: row['NAME'],
        vehicle: row['VEHICLE'],
        delivery_count: row['DELIVERY_COUNT'],
        rating: Math.round(row['RATING'] * 100)/100
    };
}

export {DeliveryInterface, rowToDeliveryInterface};