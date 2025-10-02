import { Sequelize } from "sequelize";

// Usar variable de entorno para la URL de la base de datos
const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_KHyCg9QNJbp8@ep-misty-hill-ac9gzlxq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sequelize = new Sequelize(databaseUrl, { 
  dialect: 'postgres',
  dialectModule: require('postgres'),
  ssl: {
    require: true,
    rejectUnauthorized: false,
  }, 
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;
