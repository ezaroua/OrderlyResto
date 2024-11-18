"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowToUserInterface = rowToUserInterface;
function rowToUserInterface(row) {
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
//# sourceMappingURL=userModel.js.map