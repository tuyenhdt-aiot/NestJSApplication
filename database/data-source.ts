import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config()
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: process.env.TYPEORM_SYNC === 'true',
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
