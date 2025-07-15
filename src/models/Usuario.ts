// models/Usuario.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

// Define el modelo de forma simple
const Usuario = sequelize.define("Usuario"  // <-- esto es el nombre del modelo en Sequelize, no necesariamente el nombre de la tabla
  , {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "usuario", 
  timestamps: false,
});


export default Usuario;
