import { RowDataPacket } from "mysql2";

interface UserInterface {
    id_user: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

function rowToUserInterface(row: RowDataPacket): UserInterface {
    return {
        id_user: row['id_user'],
        email: row['email'],
        password: row['password'],
        firstname: row['firstname'],
        lastname: row['lastname']
    };
}

export {UserInterface, rowToUserInterface};
