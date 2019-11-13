"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequellize_1 = require("../config/sequellize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.getReservaByFechas = (req, res) => {
    let { aula_id } = req.params;
    let { fechin, fechfin } = req.body;
    sequellize_1.Reserva.findAll({
        where: {
            res_fechin: {
                [Op.gte]: fechin
            },
            res_fechfin: {
                [Op.lte]: fechfin
            },
            aula_id: aula_id
        }
    }).then((reserva) => {
        if (reserva) {
            res.status(200).json(reserva);
        }
        else {
            res.status(404).json({
                message: "Error",
                content: "No se encontro las reservas para esta aula"
            });
        }
    });
};
