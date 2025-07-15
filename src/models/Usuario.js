"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/Usuario.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
// Define el modelo de forma simple
const Usuario = database_1.sequelize.define("Usuario" // <-- esto es el nombre del modelo en Sequelize, no necesariamente el nombre de la tabla
, {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "usuario",
    timestamps: false,
});
exports.default = Usuario;
