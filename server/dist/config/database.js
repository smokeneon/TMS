"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = {
    type: 'mysql',
    host: '8.136.5.2',
    port: 3306,
    username: 'root',
    password: '123qwe',
    database: 'tms',
    entities: [path_1.join(__dirname, '../', '**/**.entity{.ts,.js}')],
    synchronize: true,
};
//# sourceMappingURL=database.js.map