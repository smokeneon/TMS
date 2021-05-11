import { join } from 'path';
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
export default {
  root: join(__dirname, '../uploads'),
  storage: diskStorage({
    destination: join(__dirname, `../uploads/${new Date().toLocaleDateString()}`),
    filename: (req, file, cb) => {
      let suffix = file.originalname.split('.')
      return cb(null, nuid.next()+'.'+ suffix[suffix.length-1]);
    },
  }),
};
