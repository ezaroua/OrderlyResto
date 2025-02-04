import {RowDataPacket} from "mysql2/promise";

/**
 * Interface
 */
interface UserInterface {
    id_shop: number;
    id_user: number;
    firstname: string;
    lastname: string;
}

/**
 * Mapper
 */
function rowToUserInterface (row: RowDataPacket): UserInterface {
    return {
        id_shop: row['id_shop'],
        id_user: row['id_user'],
        firstname: row['firstname'],
        lastname: row['lastname']
    };
}

export {UserInterface, rowToUserInterface};