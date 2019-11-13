"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Reserva_1 = require("../cotroladores/Reserva");
const Guards_1 = require("../utils/Guards");
exports.reserva_router = express_1.Router();
exports.reserva_router.post('/reservabyfechas/:aula_id', Guards_1.guard, Reserva_1.getReservaByFechas);
