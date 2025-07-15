import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Camisa = sequelize.define(
  "Camisa",
  {
    nombreCamisa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "camisas", // usa el nombre exacto que quieres en la DB
    freezeTableName: true, // para que no pluralice ni modifique el nombre
  }
);

export default Camisa;
