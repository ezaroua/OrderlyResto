"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowToUserInterface = rowToUserInterface;
function rowToUserInterface(row) {
    return {
        id_user: row['id_user'],
        email: row['email'],
        password: row['password'],
        firstname: row['firstname'],
        lastname: row['lastname']
    };
}
//# sourceMappingURL=userModel.js.map