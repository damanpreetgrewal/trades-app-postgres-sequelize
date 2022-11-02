"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres', '123', {
    host: 'db-postgres',
    dialect: 'postgres',
    port: 5432,
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    },
});
exports.default = sequelize;
