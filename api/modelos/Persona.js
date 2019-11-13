"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//modelo aula
const sequelize_1 = require("sequelize");
exports.persona_model = (sequelize) => {
    let persona = sequelize.define('t_persona', {
        per_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        per_nom: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false
        },
        per_ape: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false
        },
        per_dir: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        per_tef: {
            type: sequelize_1.DataTypes.STRING(50)
        }
    }, {
        tableName: 't_persona',
        timestamps: false
    });
    return persona;
};
