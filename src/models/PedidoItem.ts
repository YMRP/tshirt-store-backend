import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Pedido from "./Pedido";

const PedidoItem = sequelize.define(
  "PedidoItem",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    pedidoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    nombreCamisa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    talla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pedidoitem", // minúsculas, sin plural
    freezeTableName: true,
  }
);

// Definir asociación
Pedido.hasMany(PedidoItem, { foreignKey: "pedidoId", as: "items" });
PedidoItem.belongsTo(Pedido, { foreignKey: "pedidoId" });

export default PedidoItem;
