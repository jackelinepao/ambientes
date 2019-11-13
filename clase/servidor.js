"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.puerto = process.env.PORT || 3000;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.get('/', (res, res) => {
            res.status(200).send("BIENVENIDO AL SERVIDOR");
        });
    }
    start() {
        this.app.listen(this.puerto, () => {
            console.log(`servidor OK en el puerto ${this.puerto}`);
        });
    }
}
exports.Server = Server;
