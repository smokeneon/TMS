"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const multer_1 = require("multer");
const nuid = require("nuid");
exports.default = {
    root: path_1.join(__dirname, '../uploads'),
    storage: multer_1.diskStorage({
        destination: path_1.join(__dirname, `../uploads/${new Date().toLocaleDateString()}`),
        filename: (req, file, cb) => {
            let suffix = file.originalname.split('.');
            return cb(null, nuid.next() + '.' + suffix[suffix.length - 1]);
        },
    }),
};
//# sourceMappingURL=file.js.map