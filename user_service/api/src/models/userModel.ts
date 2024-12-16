import { RowDataPacket } from 'mysql2/promise';

export enum UserVerificationStatus {
    SUCCESS = 200,            // Utilisateur vérifié avec succès
    INVALID_INPUT = 400,      // Email ou mot de passe manquant
    INVALID_EMAIL = 401,      // Email non trouvé
    INVALID_PASSWORD = 402,   // Mot de passe incorrect
    SERVER_ERROR = 500        // Erreur serveur
}

interface UserInterface {
    user_id: number;
    email: string;
    role_id: number;
    role_name?: string;
    created_at: string;
    updated_at: string;
    password: string;
}

function rowToUserInterface(row: RowDataPacket): UserInterface {
    return {
        user_id: row['user_id'],
        email: row['email'],
        password: row['password'],
        role_id: row['role_id'],
        role_name: row['role_name'], // Nom du rôle obtenu via jointure
        created_at: row['created_at'],
        updated_at: row['updated_at']
    };
}

export { UserInterface, rowToUserInterface };