import {RowDataPacket} from "mysql2/promise";

/**
 * Interface compte utilisateur
 */
interface ClientInterface {
    client_id: number;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    user_id: number;
}

/**
 * Mapper compte utilisateur
 */
function rowToClientInterface (row: RowDataPacket): ClientInterface {
    return {
        client_id: row['client_id'],
        phone: row['phone'],
        address: row['address'],
        city: row['city'],
        postal_code: row['postal_code'],
        user_id: row['user_id']
    };
}

export {ClientInterface, rowToClientInterface};