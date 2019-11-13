"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequellize_1 = require("../config/sequellize");
const Pabellon_1 = require("../rutas/Pabellon");
const Aula_1 = require("../rutas/Aula");
let bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = __importStar(require("./../apiDocs/swagger.json"));
const Usuario_1 = require("../rutas/Usuario");
const Reserva_1 = require("../rutas/Reserva");
class Server {
    constructor() {
        this.app = express_1.default();
        // obtener el puerto que nos asignará heroku
        // o establer por defecto el puerto 3000
        this.puerto = process.env.PORT || 3000;
        this.configurarBodyParser();
        this.configurarRutas();
    }
    configurarBodyParser() {
        this.app.use(bodyParser.json());
    }
    configurarRutas() {
        // configurando una ruta por defecto o de prueba
        this.app.get('/', (req, res) => {
            res.status(200).send("BIENVENIDO AL SERVIDOR");
        });
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use('/api', Pabellon_1.pabellon_router, Aula_1.aulas_router, Usuario_1.usuario_router, Reserva_1.reserva_router);
    }
    start() {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor OK en el puerto ${this.puerto}`);
            sequellize_1.sequelize.sync({ force: false }).then(() => {
                console.log("Base de datos correctamente");
            });
        });
    }
}
exports.Server = Server;
