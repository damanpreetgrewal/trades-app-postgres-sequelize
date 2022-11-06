"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
class Trade extends sequelize_1.Model {
}
Trade.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ticker: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    executionType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'execution_type',
    },
    executionDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'execution_date',
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Trade',
    tableName: 'trades',
});
exports.default = Trade;
