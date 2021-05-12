import { join } from 'path';
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
import fs = require('fs');
export default {
  root: join(__dirname, '../uploads'),
  storage: diskStorage({
   
    destination: function (req, file, cb) {
      fs.mkdir( join(__dirname, '../uploads/'+req.body.courseId) ,function(isHave){
        cb(null,join(__dirname, '../uploads/'+req.body.courseId))
      })
    },
    filename: (req, file, cb) => {
      let suffix = file.originalname.split('.')
      return cb(null, nuid.next()+'.'+ suffix[suffix.length-1]);
    },
  }),
};
