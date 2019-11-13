"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//modelo aula
const sequelize_1 = require("sequelize");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
exports.usuario_model = (sequelize) => {
    let usuario = sequelize.define('t_usuario', {
        usu_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usu_email: {
            type: sequelize_1.DataTypes.STRING(30),
            allowNull: false
        },
        usu_hash: {
            type: sequelize_1.DataTypes.TEXT
        },
        usu_salt: {
            type: sequelize_1.DataTypes.TEXT
        },
        usu_fechreg: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        usu_fechses: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        usu_imgurl: {
            type: sequelize_1.DataTypes.TEXT
        }
    }, {
        tableName: 't_usuario',
        timestamps: false
    });
    usuario.prototype.setSaltYHash = function (password) {
        this.usu_salt = crypto.randomBytes(16).toString('hex');
        this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    };
    usuario.prototype.validPass = function (password) {
        let usu_hash_temp = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
        return usu_hash_temp === this.usu_hash;
    };
    //https://jwt.io/
    //{usuario:{
    //    usu_
    //}}
    usuario.prototype.generarJWT = function () {
        let payload = {
            usu_id: this.usu_id,
            usu_nom: `${this.usu_nom} ${this.usu_ape}`
        };
        let token = jwt.sign(payload, 'codigo6', { expiresIn: '1h' }, { algorithm: 'RS256' });
        return token;
    };
    return usuario;
};
