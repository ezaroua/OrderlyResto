import { RowDataPacket } from 'mysql2/promise';

interface UserInterface {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string | null;
    role_id: number;
    role_name?: string;
    created_at: string;
    updated_at: string;
}

function rowToUserInterface(row: RowDataPacket): UserInterface {
    return {
        id: row['id'],
        first_name: row['first_name'],
        last_name: row['last_name'],
        username: row['username'],
        email: row['email'],
        phone: row['phone'],
        role_id: row['role_id'],
        role_name: row['role_name'], // Nom du rôle obtenu via jointure
        created_at: row['created_at'],
        updated_at: row['updated_at']
    };
}

export { UserInterface, rowToUserInterface };
