import {RowDataPacket} from "mysql2/promise";

/**
 * Interface compte utilisateur
 */
interface DeliveryInterface {
    id_delivery_user: string;
    id_user: number;
    first_name: string;
    last_name: string;
    vehicle: string;
    rating_count: number;
    rating: number;
    // TODO reste de l'interface
}

/**
 * Mapper compte utilisateur
 */
function rowToDeliveryInterface (row: RowDataPacket): DeliveryInterface {
    return {
        id_delivery_user: row['id_delivery_user'],
        id_user: row['id_user'],
        first_name: row['first_name'],
        last_name: row['last_name'],
        vehicle: row['vehicle'],
        rating_count: row['rating_count'],
        rating: Math.round(row['rating'] * 100)/100
    };
}

export {DeliveryInterface, rowToDeliveryInterface};