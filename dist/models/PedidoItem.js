"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Pedido_1 = __importDefault(require("./Pedido"));
const PedidoItem = database_1.sequelize.define("PedidoItem", {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    pedidoId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    productoId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    nombreCamisa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    talla: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "pedidoitem", // minúsculas, sin plural
    freezeTableName: true,
});
// Definir asociación
Pedido_1.default.hasMany(PedidoItem, { foreignKey: "pedidoId", as: "items" });
PedidoItem.belongsTo(Pedido_1.default, { foreignKey: "pedidoId" });
exports.default = PedidoItem;
