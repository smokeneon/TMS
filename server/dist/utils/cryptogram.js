"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = exports.makeSalt = void 0;
const crypto = require("crypto");
function makeSalt() {
    return crypto.randomBytes(3).toString('base64');
}
exports.makeSalt = makeSalt;
function encryptPassword(password, salt) {
    if (!password || !salt) {
        return '';
    }
    const tempSalt = Buffer.from(salt, 'base64');
    return (crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64'));
}
exports.encryptPassword = encryptPassword;
//# sourceMappingURL=cryptogram.js.map