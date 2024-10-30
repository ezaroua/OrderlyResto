import {RowDataPacket} from "mysql2/promise";

/**
 * Interface compte utilisateur
 */
interface UserInterface {
    id_user: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    // TODO reste de l'interface
}

/**
 * Mapper compte utilisateur
 */
const rowToUserInterface = (row: RowDataPacket): UserInterface => {
    return {
        id_user: row['id_user'],
        email: row['email'],
        password: row['password'],
        firstname: row['firstname'],
        lastname: row['lastname']
    };
}

export {UserInterface, rowToUserInterface};