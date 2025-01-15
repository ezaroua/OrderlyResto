import {RowDataPacket} from "mysql2/promise";

/**
 * Interface client
 */
interface ClientInterface {
    id_client: number;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    id_user: number;
}

/**
 * Mapper client
 */
function rowToClientInterface (row: RowDataPacket): ClientInterface {
    return {
        id_client: row['id_client'],
        firstname: row['firstname'],
        lastname: row['lastname'],
        phone: row['phone'],
        address: row['address'],
        city: row['city'],
        postal_code: row['postal_code'],
        id_user: row['id_user']
    };
}

export {ClientInterface, rowToClientInterface};