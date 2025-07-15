"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Camisa = database_1.sequelize.define("Camisa", {
    nombreCamisa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    desc: {
        type: sequelize_1.DataTypes.STRING,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: "camisas", // usa el nombre exacto que quieres en la DB
    freezeTableName: true, // para que no pluralice ni modifique el nombre
});
exports.default = Camisa;
