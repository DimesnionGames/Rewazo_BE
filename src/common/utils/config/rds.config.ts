import { config } from 'dotenv';
config();

export const rdsConfig = {
  type: process.env.TYPE,
  host: process.env.RDS_HOST,
  port: process.env.RDS_PORT,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
};
