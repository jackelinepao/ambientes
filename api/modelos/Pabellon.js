"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//modelo aula
const sequelize_1 = require("sequelize");
exports.pabellon_model = (sequelize) => {
    let pabellon = sequelize.define('t_pabellon', {
        pabellon_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        pabellon_nom: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true
        },
    }, {
        tableName: 't_pabellon',
        timestamps: true
    });
    return pabellon;
};
