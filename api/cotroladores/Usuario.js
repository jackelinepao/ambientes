"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequellize_1 = require("../config/sequellize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.crearUsuario = (req, res) => {
    let objUsuario = sequellize_1.Usuario.build(req.body.usuario);
    objUsuario.setSaltYHash(req.body.usuario.usu_pass);
    objUsuario.save().then((usuarioCreado) => {
        sequellize_1.Usuario.findByPk(usuarioCreado.usu_id).then((usuarioEncontrado) => {
            res.status(201).json({
                message: 'Usuario creado',
                content: usuarioEncontrado
            });
        });
    }).catch((error) => {
        res.status(501).json({
            message: 'Error',
            content: error
        });
    });
};
exports.encontrarUsuByNomOApe = (req, res) => {
    let busqueda = req.body.busqueda;
    sequellize_1.Usuario.findAll({
        where: {
            [Op.or]: [
                {
                    usu_nom: {
                        [Op.substring]: busqueda
                    }
                },
                {
                    usu_ape: {
                        [Op.substring]: busqueda
                    }
                }
            ]
        }
    }).then((rpta) => {
        res.json(rpta);
    });
};
exports.iniciarSesion = (req, res) => {
    let { usu_email, usu_pass } = req.body;
    let buff = Buffer.from(usu_pass, 'utf-8').toString('ascii');
    sequellize_1.Usuario.findOne({
        where: {
            usu_email: usu_email
        }
    }).then((ObjUsuario) => {
        if (ObjUsuario) {
            let validarPass = ObjUsuario.validPass(buff);
            if (validarPass) {
                let token = ObjUsuario.generarJWT();
                res.status(200).json({
                    message: 'Ok',
                    token
                });
            }
            else {
                res.status(500).json({
                    message: 'error',
                    content: 'Usuario o contraseña incorrectos.'
                });
            }
        }
        else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro el usuario'
            });
        }
    });
};
