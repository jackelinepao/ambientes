"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Aula_1 = require("./../cotroladores/Aula");
exports.aulas_router = express_1.Router();
exports.aulas_router.post('/aulas', Aula_1.postAula);
