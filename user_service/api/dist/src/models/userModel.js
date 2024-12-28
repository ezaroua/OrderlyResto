"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerificationStatus = void 0;
exports.rowToUserInterface = rowToUserInterface;
var UserVerificationStatus;
(function (UserVerificationStatus) {
    UserVerificationStatus[UserVerificationStatus["SUCCESS"] = 200] = "SUCCESS";
    UserVerificationStatus[UserVerificationStatus["INVALID_INPUT"] = 400] = "INVALID_INPUT";
    UserVerificationStatus[UserVerificationStatus["INVALID_EMAIL"] = 401] = "INVALID_EMAIL";
    UserVerificationStatus[UserVerificationStatus["INVALID_PASSWORD"] = 402] = "INVALID_PASSWORD";
    UserVerificationStatus[UserVerificationStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR"; // Erreur serveur
})(UserVerificationStatus || (exports.UserVerificationStatus = UserVerificationStatus = {}));
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