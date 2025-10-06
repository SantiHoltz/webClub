import { Sequelize } from "sequelize";
import pg from "pg"; // <-- driver correcto para Sequelize

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL no está definida");
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
    // Si tu DATABASE_URL ya trae "sslmode=require", igual dejamos esto por compatibilidad.
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    // Pool chico para serverless
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;
