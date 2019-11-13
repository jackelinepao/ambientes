"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//modelo aula
const sequelize_1 = require("sequelize");
exports.persona_model = (sequelize) => {
    let alquiler = sequelize.define('t_alquiler', {
        alqui_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        alqui_fech: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        alqui_fechin: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        alqui_fechfin: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        alqui_cost: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        },
        alqui_est: {
            type: sequelize_1.DataTypes.STRING(45)
        }
    }, {
        tableName: 't_alquiler',
        timestamps: false
    });
    return alquiler;
};
