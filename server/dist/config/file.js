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
            fs.mkdir(path_1.join(__dirname, '../uploads/' + req.body.courseId), function (isHave) {
                cb(null, path_1.join(__dirname, '../uploads/' + req.body.courseId));
            });
        },
        filename: (req, file, cb) => {
            let suffix = file.originalname.split('.');
            return cb(null, nuid.next() + '.' + suffix[suffix.length - 1]);
        },
    }),
};
//# sourceMappingURL=file.js.map