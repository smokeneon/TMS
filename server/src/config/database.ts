import { join } from 'path';
export default {
  type: 'mysql',
  host: '8.136.5.2',
  port: 3306,
  username: 'root',
  password: '123qwe',
  database: 'tms',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};
