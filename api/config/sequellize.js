"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://remotemysql.com/databases.php
const Pabellon_1 = require("../modelos/Pabellon");
const Aula_1 = require("../modelos/Aula");
const TipoAula_1 = require("../modelos/TipoAula");
const Usuario_1 = require("../modelos/Usuario");
const Reserva_1 = require("../modelos/Reserva");
const Sequelize = require("sequelize");
exports.sequelize = new Sequelize(
// 'LDv0pN4uWQ',//database name
// 'LDv0pN4uWQ',//username
// 'JGnf7mu1Ya', //password
'aulas', 'root', 'root', {
    //host: 'remotemysql.com',//server name: remotemysql.com:3306
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-05:00',
    dialectOption: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    }
});
//otra forma de conectarse
//export const conexion2 = new Sequelize('mysql://root:root@localhost:3306/aulas)
exports.Pabellon = Pabellon_1.pabellon_model(exports.sequelize);
exports.Aula = Aula_1.aula_model(exports.sequelize);
exports.TipoAula = TipoAula_1.tipoaula_model(exports.sequelize);
exports.Usuario = Usuario_1.usuario_model(exports.sequelize);
exports.Reserva = Reserva_1.reserva_model(exports.sequelize);
exports.Pabellon.hasMany(exports.Aula, { foreignKey: "pabellon_id" }),
    exports.Aula.belongsTo(exports.Pabellon, { foreignKey: "pabellon_id" }),
    exports.Aula.hasMany(exports.Reserva, { foreignKey: "aula_id" }),
    exports.Reserva.belongsTo(exports.Aula, { foreignKey: "aula_id" }),
    exports.Usuario.hasMany(exports.Reserva, { foreignKey: "usu_id" }),
    exports.Reserva.belongsTo(exports.Usuario, { foreignKey: "usu_id" }),
    exports.TipoAula.hasMany(exports.Aula, { foreignKey: "taula_id" }),
    exports.Aula.belongsTo(exports.TipoAula, { foreignKey: "taula_id" });
