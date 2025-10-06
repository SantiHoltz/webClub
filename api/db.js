// api/db.js  (poner ESTO primero)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") }); // <-- carga /api/.env

// api/db.js  (o ../db.js según dónde lo tengas)
import { Sequelize } from "sequelize";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL no está definida");

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: { max: 2, min: 0, acquire: 30000, idle: 10000 }
});

export default sequelize;
