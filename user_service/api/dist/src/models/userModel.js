"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowToUserInterface = rowToUserInterface;
function rowToUserInterface(row) {
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
//# sourceMappingURL=userModel.js.map