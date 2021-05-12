import { join, resolve } from 'path';
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
import fs = require('fs')
export default {
  root: join(__dirname, '../uploads'),
  storage: diskStorage({
   
    destination: function (req, file, cb) {
      if (!fs.existsSync(resolve()+'/dist/upload/'+req.body.courseId)) {
        fs.mkdirSync(resolve()+'/dist/upload/'+req.body.courseId)
      } 
      cb(null,resolve()+'/dist/upload/'+req.body.courseId)
    },
    filename: (req, file, cb) => {
      let suffix = file.originalname.split('.')
      return cb(null, nuid.next()+'.'+ suffix[suffix.length-1]);
    },
  }),
};
