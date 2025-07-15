import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.MYSQL_ADDON_URI!, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // necesario para Clever Cloud
    },
  },
  logging: false,
});
