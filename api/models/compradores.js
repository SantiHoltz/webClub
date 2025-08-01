import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";

class Comprador extends Model {}

Comprador.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nombre"
  },
  cuadricula: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: "cuadricula"
  }
}, 
{
  sequelize,
  modelName: "Comprador",
  tableName: "Comprador",
  timestamps: false
});

export default Comprador;
