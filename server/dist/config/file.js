"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const multer_1 = require("multer");
const nuid = require("nuid");
const fs = require("fs");
exports.default = {
    root: path_1.join(__dirname, '../uploads'),
    storage: multer_1.diskStorage({
        destination: function (req, file, cb) {
            if (!fs.existsSync(path_1.resolve() + '/dist/upload/' + req.body.courseId)) {
                fs.mkdirSync(path_1.resolve() + '/dist/upload/' + req.body.courseId);
            }
            cb(null, path_1.resolve() + '/dist/upload/' + req.body.courseId);
        },
        filename: (req, file, cb) => {
            let suffix = file.originalname.split('.');
            return cb(null, nuid.next() + '.' + suffix[suffix.length - 1]);
        },
    }),
};
//# sourceMappingURL=file.js.map