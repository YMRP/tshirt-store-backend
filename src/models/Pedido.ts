import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Pedido = sequelize.define(
  "Pedido",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigoPostal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pedido", // nombre exacto en minúsculas
    freezeTableName: true, // no pluralizar
  }
);

export default Pedido;
